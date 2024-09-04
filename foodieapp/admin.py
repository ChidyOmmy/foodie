from django.contrib import admin
from .models import Meal, Order, OrderItem,Profile

admin.site.register(Profile)

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'inStock', 'ratings')
    search_fields = ('title', 'description')

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1  # Number of empty forms to display
    readonly_fields = ('total_price',)  # Make total_price readonly
    fields = ('meal', 'quantity', 'total_price')  # Fields to display in the inline form

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'customer_mobile', 'order_date', 'total_price','is_completed')
    search_fields = ('customer_name', 'customer_mobile')
    list_filter = ('is_completed','order_date')
    readonly_fields = ('total_price',)  # Make total_price readonly
    inlines = [OrderItemInline]  # Add OrderItemInline to display order items

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        obj.update_total_price()  # Ensure total price is updated after saving

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'meal', 'quantity', 'total_price')
    search_fields = ('order__customer_name', 'meal__title')
    list_filter = ('order', 'meal')
    readonly_fields = ('total_price',)  # Make total_price readonly

