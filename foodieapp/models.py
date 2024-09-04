from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile',null=True,blank=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15)
    def __str__(self):
        return self.user.username

class Meal(models.Model):
    title = models.CharField(max_length=255)
    # Store images in the 'meals/' directory within MEDIA_ROOT
    image = models.ImageField(upload_to='meals/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    inStock = models.PositiveIntegerField()
    ratings = models.FloatField()
    category = models.JSONField()  # To store categories as a list
    description = models.TextField()

    def __str__(self):
        return self.title

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True,related_name='orders')
    customer_name = models.CharField(max_length=255)  # Customer's name
    customer_mobile = models.CharField(max_length=15)  # Mobile number of the customer
    delivery_address = models.TextField()  # Delivery address for the order
    additional_info = models.TextField(null=True, blank=True)  # additional direction for the user
    transaction_code = models.CharField(max_length=35)  # transaction code from ussd for the order
    order_date = models.DateTimeField(auto_now_add=True)  # Date and time of order creation
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Total price of the order
    is_completed = models.BooleanField(default=False)  # Check if the order is completed

    def update_total_price(self):
        self.total_price = sum(item.total_price for item in self.items.all())
        self.save()

    def __str__(self):
        return f"Order {self.id} - {self.customer_name}"
   
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, editable=False)

    def clean(self):
        #if item is being created not updated (makes it easier for admin to update order status especially completed without errors)
        if not self.id:
             # Check if quantity exceeds inStock
            if self.quantity > self.meal.inStock:
                raise ValidationError(f"Quantity cannot exceed available stock ({self.meal.inStock})")
        
    def save(self, *args, **kwargs):
        # Call clean method to validate quantity
        self.clean()
        
        # Calculate total_price
        self.total_price = self.meal.price * self.quantity
        
        # Update meal stock
        if self.pk is None:
            # If creating a new OrderItem, reduce the stock
            self.meal.inStock -= self.quantity
        else:
            # If updating an existing OrderItem, adjust stock
            old_quantity = OrderItem.objects.get(pk=self.pk).quantity
            self.meal.inStock += old_quantity
            self.meal.inStock -= self.quantity
        
        if self.meal.inStock < 0:
            raise ValidationError("Not enough stock available.")
        
        # Save meal stock changes
        self.meal.save()
        
        super().save(*args, **kwargs)

        # Update the total price of the parent order
        self.order.update_total_price()

    def __str__(self):
        return f"{self.quantity} x {self.meal.title} for Order {self.order.id}"