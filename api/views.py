from django.http import JsonResponse
from django.db import transaction, IntegrityError
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist, ValidationError
import json
from rest_framework.response import Response
from foodieapp.models import Meal, Order, OrderItem, Profile
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, MealSerializer, OrderSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def index(request):
    queryset = Meal.objects.all()
    serializer = MealSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders(request):
    # Get the authenticated user
    user = request.user

    # Get all orders related to this user
    orders = Order.objects.filter(user=user)

    # Serialize the orders
    serializer = OrderSerializer(orders, many=True)

    # Send the serialized data as a JSON response
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    try:
        data = json.loads(request.body)
        fullname = data.get('full_name').strip().split(' ', 1)
        first_name = fullname[0]
        last_name = fullname[1] if len(fullname) > 1 else ''
        address = data.get("address")
        phone = data.get("phone")

        if request.user.is_authenticated:
            user = request.user
            # Update user's first and last name if necessary
            user.first_name = first_name
            user.last_name = last_name
            user.profile.address = address
            user.profile.phone = phone
            user.profile.save()
            user.save()
            return Response({
                'message': 'User profile successfully updated',
                'user': {
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'address': user.profile.address,
                    'phone': user.profile.phone,
                }
            })
        else:
            return Response({'error': "Couldn't update user profile"})
    except Exception as e:
        return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_order(request):
    try:
        data = json.loads(request.body)
        error ={}
        tokens ={}
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

        user = None  # Initialize the user as None

        # Check if the user is authenticated
        if request.user.is_authenticated:
            user = request.user
        else:
            # Attempt to create a new user only if essential user data is provided
            phonenumber = data.get('phonenumber')
            password = data.get('password')

            if phonenumber and password:  # Check that both phone number and password are provided and not empty
                # Check if phonenumber is already associated with an existing user
                existing_users = User.objects.filter(username=phonenumber)
                if existing_users.exists():
                    user = existing_users.first()
                    # Generate tokens for the existing user
                    serializer = MyTokenObtainPairSerializer(data={
                        'username': phonenumber,
                        'password': password
                    })
                    if serializer.is_valid():
                        authTokens = serializer.validated_data
                        # Skip user creation and return authTokens
                        tokens = {'authTokens': authTokens}
                    else:
                        error = {'error': 'Invalid credentials for existing user'}
                else:
                    try:
                        user = User.objects.create_user(
                        username=phonenumber,
                        password=password,
                        first_name=first_name,
                        last_name=last_name
                        )

                        Profile.objects.create(
                        user=user,
                        phone=phonenumber,
                        address=data.get('location'))

                        # Generate tokens for the existing user
                        serializer = MyTokenObtainPairSerializer(
                            data={
                                'username': phonenumber,
                                'password': password
                                  })
                        if serializer.is_valid():
                            authTokens = serializer.validated_data
                            # Skip user creation and return authTokens
                            tokens = {'authTokens': authTokens}
                        else:
                            error = {'error': 'Invalid credentials for existing user'}
                    except Exception as e:
                        error = {'error': f'Failed to create user: {str(e)}'}
                    
        # Create the order within an atomic transaction
        if user == None:
            return JsonResponse({"error": "User is not aunthenticated, please login or provide your number and a password to create a new account"})
        with transaction.atomic():
            order = Order.objects.create(
                user=user,  # Associate the order with the user, could be None
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
                        order=order, meal=meal, quantity=item["quantity"])
                except Meal.DoesNotExist:
                    return JsonResponse({'error': f'Meal with id {item["id"]} does not exist'}, status=400)

            order.update_total_price()

        return JsonResponse({'message': 'Order created successfully', 'order_id': order.id,"error":error,"tokens":tokens})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)

    except ValidationError as e:
        return JsonResponse({'error': str(e)}, status=400)

    except Exception as e:
        return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)
