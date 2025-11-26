from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from time import timezone


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

# Create your views here.

# User
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def list(self,request):
    #     queryset = self.get_queryset()
    #     serializer = UserSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)

    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)
    
    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial',False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance,data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)

    #     if getattr(instance,'_prefetched_objects_cache', None):
    #         instance._prefetched_objects_cache = {}

    #     return Response(serializer.data)
    
    # def perform_update(self, serializer):
    #     serializer.save()

    # def partial_update(self, request, *args, **kwargs):
    #     kwargs['partial'] = True
    #     return self.update(request, *args, **kwargs)
            
    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)


#  Category
class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # def list(self,request):
    #     queryset = self.get_queryset()
    #     serializer = CategorySerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    # #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class CategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)
    
    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial',False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance,data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)

    #     if getattr(instance,'_prefetched_objects_cache', None):
    #         instance._prefetched_objects_cache = {}

    #     return Response(serializer.data)
    
    # def perform_update(self, serializer):
    #     serializer.save()

    # def partial_update(self, request, *args, **kwargs):
    #     kwargs['partial'] = True
    #     return self.update(request, *args, **kwargs)
            
    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)

#  Historic
class HistoricListCreate(generics.ListCreateAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer

    # def list(self,request):
    #     queryset = self.get_queryset()
    #     serializer = HistoricSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class HistoricRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
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

        # queryset = self.get_queryset()
        # serializerProduct = ProductSerializer(queryset, many=True)
        # return Response(serializerProduct.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
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

def add_quantity_product(product_id,quantity_to_add,user_id):
    try:
        product = Product.objects.all(id=product_id)
        product.quantity += quantity_to_add
        product.save()

        historic_entry = Historic.objects.create(
            product=product,
            responsibleUser=User.objects.get(id=user_id),
            operationDate=timezone,
            typeOperation="Input",
            quantityProduct=quantity_to_add
        )

        return {"message": "Produto atualizado e histórico de entrada criado com sucesso!"}
    except Product.DoesNotExist:
        return {"Error": "Product not found"}
    except User.DoesNotExist:
        return {"Error": "User not found"}
    except Exception as e:
        return {"Error": str(e)}