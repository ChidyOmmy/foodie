from rest_framework import serializers
from foodieapp.models import Meal


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'title', 'image', 'price',
                  'inStock', 'ratings', 'category', 'description']
