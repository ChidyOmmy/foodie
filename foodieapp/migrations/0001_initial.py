# Generated by Django 5.1 on 2024-08-09 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='images/')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('in_stock', models.PositiveIntegerField()),
                ('ratings', models.FloatField()),
                ('category', models.JSONField()),
                ('description', models.TextField()),
            ],
        ),
    ]