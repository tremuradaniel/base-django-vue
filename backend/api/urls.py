from django.urls import path
from .views import CurrentUserView, UserListView, UserDetailView

urlpatterns = [
    path('users/me/', CurrentUserView.as_view(), name='current_user'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
]
