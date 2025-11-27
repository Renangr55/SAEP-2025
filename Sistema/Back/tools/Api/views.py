from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from time import timezone
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json



from .models import (
    Historic,
    User,
    Category,
    Product
)
from .serializers import(
    UserSerializer,
    HistoricSerializer,
    CategorySerializer,
    ProductSerializer
)
from .models import User
from rest_framework import generics
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

# Create your views here.

# User: list all and create
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# User: update,retrive and Destroy
class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "username and password are required"}, status=400)

        user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid credentials"}, status=401)


#  Category
class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# Category: retrive,update and Destroy
class CategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


#  Historic: list all and create
class HistoricListCreate(generics.ListCreateAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer

# Historic: update,retrive and destroy
class HistoricRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
# Product: list all and create
class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


    def list(self,request,*args, **kwargs):
        queryset = self.get_queryset()

        serializerProduct = ProductSerializer(queryset, many=True)

        alerts = []

        for product in queryset:
            if product.quantity <= product.minimum_quantity:
                alerts.append(
                    f"The product {product.name} reached to minimun quantity"
                )

        response = {
        "Product": serializerProduct.data,
        "alert": alerts
        }

        return Response(response)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
# Product: list all and create
class ProductRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def retrieve(self, request, *args, **kwargs):
        product = self.get_object()
        serializer = ProductSerializer(product)

        alert = None

        if product.quantity <= product.minimum_quantity:
            alert = f"The product {product.name} reached to minimun quantity"

        return Response ({
            "product": serializer.data,
            "alert": alert
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial',False)
        instance = self.get_object()
        serializer = self.get_serializer(instance,data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance,'_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
            
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

# add quantity of product
@csrf_exempt
def add_quantity_product_view(request):
    if request.method != "POST":
        return JsonResponse({"Error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)

        product_id = data.get("product_id")
        quantity = data.get("quantity")
        user_id = data.get("user_id")
        
        quantity = data.get("quantity")

        if quantity  is None:
            return JsonResponse({"Error": "quantity is required"}, status=400)


        try:
            quantity = int(quantity)
        except ValueError:
            return JsonResponse({"Error": "quantity must be an integer"}, status=400)

        product = Product.objects.get(id=product_id)
        product.quantity += quantity
        product.save()

        Historic.objects.create(
            product=product,
            responsibleUser=User.objects.get(id=user_id),
            typeOperation="Input",
            quantityProduct=quantity
        )

        return JsonResponse({"message": "it product has updated and Historic created!"})

    except Product.DoesNotExist:
        return JsonResponse({"Error": "Product not found"}, status=404)

    except User.DoesNotExist:
        return JsonResponse({"Error": "User not found"}, status=404)

    except Exception as e:
        return JsonResponse({"Error": str(e)}, status=400)
    
# remove quantity of product
@csrf_exempt
def remove_quantity_product_view(request):
    if request.method != "DELETE":
        return JsonResponse({"Error": "Only DELETE allowed"}, status=405)

    try:
        data = json.loads(request.body)

        product_id = data.get("product_id")
        quantity = data.get("quantity")
        user_id = data.get("user_id")
        
        quantity = data.get("quantity")

        if quantity  is None:
            return JsonResponse({"Error": "quantity is required"}, status=400)

        

        try:
            quantity = int(quantity)
        except ValueError:
            return JsonResponse({"Error": "quantity must be an integer"}, status=400)
    
        product = Product.objects.get(id=product_id)
        
        if product.quantity > 0: 
            product.quantity -= quantity
            product.save()
        else:
            return JsonResponse({"Error": "the quantity of product cannot be bigger than or equal to zero"})
        

        Historic.objects.create(
            product=product,
            responsibleUser=User.objects.get(id=user_id),
            typeOperation="Output",
            quantityProduct=quantity
        )

        return JsonResponse({"message": "it product has updated and Historic created!"})

    except Product.DoesNotExist:
        return JsonResponse({"Error": "Product not found"}, status=404)

    except User.DoesNotExist:
        return JsonResponse({"Error": "User not found"}, status=404)

    except Exception as e:
        return JsonResponse({"Error": str(e)}, status=400)