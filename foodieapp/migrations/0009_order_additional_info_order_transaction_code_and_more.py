# Generated by Django 5.1 on 2024-08-10 23:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodieapp', '0008_alter_orderitem_total_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='additional_info',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='transaction_code',
            field=models.CharField(default='bcdfghh', max_length=35),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='total_price',
            field=models.DecimalField(blank=True, decimal_places=2, editable=False, max_digits=10),
        ),
    ]