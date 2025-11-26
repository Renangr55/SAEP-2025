from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):


    def __str__(self):
        return self.username

    class Meta:
        verbose_name_plural = "Users"

class Category(models.Model):
    categoryName = models.CharField(unique=True)

    def __str__(self):
        return self.categoryName
    
    class Meta:  
        verbose_name_plural = "Categorys"

class Product(models.Model):
    name = models.CharField(unique=True,max_length=120)
    categoryProduct = models.ForeignKey(Category,on_delete=models.CASCADE)
    height = models.DecimalField(max_digits=10,decimal_places=2)
    weight = models.DecimalField(max_digits=10,decimal_places=2)
    quantity = models.IntegerField()
    minimum_quantity = models.IntegerField()
    imageProduct = models.ImageField(upload_to='images/', blank=True, null= True)



    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Products"
       

class Historic(models.Model):
    typeOperationChoices = [
    ("Input", "Input"),
    ("Output", "Output")
    ]
    responsibleUser = models.ForeignKey(User,on_delete=models.CASCADE)

    typeOperation = models.CharField(choices=typeOperationChoices,max_length=6)
    quantityProduct = models.IntegerField()
    product = models.ForeignKey(Product, related_name='historic', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Historic - {self.id}"
    
    class Meta:
        verbose_name_plural = "Historics" 
        ordering = ['-created_at']
