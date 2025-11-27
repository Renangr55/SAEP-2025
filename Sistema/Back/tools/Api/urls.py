from django.urls import path
from .views import (
    UserListCreate,

    ProductListCreate,
    ProductRetrieveUpdateDestroy,

    add_quantity_product_view,
    remove_quantity_product_view,

    CategoryListCreate,
    CategoryRetrieveUpdateDestroy,

    HistoricListCreate,
    HistoricRetrieveUpdateDestroy,

    UserLoginView

)




urlpatterns = [
    # user
    path('api/createListUser', UserListCreate.as_view(), name="createListUser"),
    path('api/auth/login', UserLoginView.as_view()),

    # product
    path('api/createListProduct',  ProductListCreate.as_view(), name="createListProduct"),
    path('api/updateDestroyRetriveProduct/<int:pk>', ProductRetrieveUpdateDestroy.as_view()),

    #Category
    path("api/createListCategory", CategoryListCreate.as_view(), name="createListCategory"),
    path("api/updateDestroyRetriveCategory/<int:pk>",CategoryRetrieveUpdateDestroy.as_view(), name="updateDestroyRetriveCategory"),
    
    # Historic 
    path("api/createListHistoric", HistoricListCreate.as_view(), name="createListHistoric"),
    path("api/updateDestroyRetriveHistoric/<int:pk>",HistoricRetrieveUpdateDestroy.as_view(), name="updateDestroyRetriveHistoric"),

    # add and remove Product
    path("api/addProduct/", add_quantity_product_view, name="add_product"),
    path("api/removeProduct/", remove_quantity_product_view, name="remove_product")

    ]