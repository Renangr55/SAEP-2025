from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from .models import (
    User,
    Product,
    Historic,
    Category
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Category.objects.all(),
                message="this category it was created!!!"
            )
        ]
    )

    class Meta:
        model = Category
        fields = "__all__"

# Historic Serializer
class HistoricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historic
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Product.objects.all(),
                message="this product it was created!!!"
            )
        ]
    )

    historic = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
    
    def get_historic(self,obj):
            return HistoricSerializer(obj.historic.order_by('-created_at'), many=True).data
