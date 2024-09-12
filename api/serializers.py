from rest_framework import serializers
from foodieapp.models import Meal, OrderItem,Order
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'title', 'image', 'price',
                  'inStock', 'ratings', 'category', 'description']


class OrderItemSerializer(serializers.ModelSerializer):
    meal = MealSerializer()

    class Meta:
        model = OrderItem
        fields = ['meal', 'quantity', 'total_price']
class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True, source='items')

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'customer_name',
            'customer_mobile',
            'delivery_address',
            'additional_info',
            'transaction_code',
            'order_date',
            'total_price',
            'is_completed',
            'order_items'  # Nested serializer to include order items
        ]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add additional user data to the response
        data['user'] = {
            'username': self.user.username,
            'email': self.user.email,
            'first': self.user.first_name,
            'last': self.user.last_name,
        }

        # Assuming you have a Profile model with a one-to-one relationship with User
        profile = self.user.profile
        data['profile'] = {
            'location': profile.address,
            'phone': profile.phone,
        }

        return data
