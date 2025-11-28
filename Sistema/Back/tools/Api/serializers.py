from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import (
    User,
    Product,
    Historic,
    Category
)
# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])  
        user.save()
        return user

# category serializer
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

# product serializer
class ProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Product.objects.all(),
                message="this product it was created!!!" #message for when do it create a product with name already exists
            )
        ]
    )

    historic = serializers.SerializerMethodField(read_only=True)

    category_name = serializers.CharField(source='categoryProduct.categoryName', read_only=True)


    class Meta:
        model = Product
        fields = '__all__'
    
    def get_historic(self,obj):
        return HistoricSerializer(obj.historic.order_by('-created_at'), many=True).data #ordering historic by create date
    
    def validate(self, data):
        quantity = data.get("quantity")
        minimum = data.get("minimum_quantity")

        if quantity is not None and minimum is not None:
            if quantity < minimum:
                raise serializers.ValidationError({
                    "quantity": "A quantidade não pode ser menor que a quantidade mínima."
                })

        return data
