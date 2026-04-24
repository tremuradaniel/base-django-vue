from django.urls import path
from .views import CurrentUserView, UserListView, UserDetailView, PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('users/me/', CurrentUserView.as_view(), name='current_user'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
