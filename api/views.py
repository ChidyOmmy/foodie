from django.http import JsonResponse
from django.db import transaction, IntegrityError
from django.contrib.auth.models import User
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist, ValidationError
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import MealSerializer 
from foodieapp.models import Meal, Order, OrderItem
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

# Create your views here.
@api_view(['GET'])
def index(request):
    queryset = Meal.objects.all()
    serializer = MealSerializer(queryset,many=True)
    return Response(serializer.data)


@api_view(['POST'])
@csrf_exempt  # Disables CSRF protection for this view (use with caution)
def create_order(request):
    try:
        data = json.loads(request.body)

        # Ensure essential fields are present
        required_fields = ['fullname', 'phonenumber',
                           'location', 'transaction', 'cart']
        for field in required_fields:
            if field not in data:
                return JsonResponse({'error': f'Missing required field: {field}'}, status=400)

        # Split fullname into first and last name
        fullname = data.get('fullname').strip().split(' ', 1)
        first_name = fullname[0]
        last_name = fullname[1] if len(fullname) > 1 else ''

        # Get the logged-in user, or create a new one if not logged in
        if request.user.is_authenticated:
            user = request.user
            # Update user's first and last name if necessary
            user.first_name = first_name
            user.last_name = last_name
            user.save()
        else:
            user = User.objects.create_user(
                username=data.get('phonenumber'),
                password=data.get('password'),
                first_name=first_name,
                last_name=last_name
            )

        # Create the order within an atomic transaction
        with transaction.atomic():
            order = Order.objects.create(
                user=user,  # Associate the order with the user
                customer_name=data.get('fullname'),
                customer_mobile=data.get('phonenumber'),
                delivery_address=data.get('location'),
                additional_info=data.get('additionalinfo'),
                transaction_code=data.get('transaction')
            )

            mylist = data.get('cart')
            for item in mylist:
                try:
                    meal = Meal.objects.get(pk=item["id"])
                    OrderItem.objects.create(
                        order=order, meal=meal, quantity=item["purchased"])
                except Meal.DoesNotExist:
                    return JsonResponse({'error': f'Meal with id {item["id"]} does not exist'}, status=400)

            order.update_total_price()

        return JsonResponse({'message': 'Order created successfully', 'order_id': order.id})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)

    except ValidationError as e:
        return JsonResponse({'error': str(e)}, status=400)

    except Exception as e:
        return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)
