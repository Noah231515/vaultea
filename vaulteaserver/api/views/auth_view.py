import json
from django.http.response import JsonResponse
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import User, Vault
from api.user_service import UserService
from api.serializers.auth_serializer import SignUpFormSerializer, LoginFormSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
  serializer = SignUpFormSerializer(data=json.loads(request.body))
  if serializer.is_valid(raise_exception=True):
    data = serializer.data

    new_user = User.objects.create(username=data['username'], is_active=True)
    new_user.key = data["key"]
    User.set_password(new_user, data['password'])
    new_user.save()

    new_vault = Vault()
    new_vault.user_id = new_user
    new_vault.save()

    return Response(None, status=status.HTTP_200_OK)
  else:
    return Response({'key': 'value'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
  serializer = LoginFormSerializer(data=json.loads(request.body))  
  if serializer.is_valid(raise_exception=True):
    data = serializer.data
    authenticated_user = authenticate(request, username=data['username'], password=data['password'])
    if authenticated_user:
      user_service = UserService()
      refreshToken = RefreshToken.for_user(authenticated_user)
      return JsonResponse(user_service.get_user_info(authenticated_user, refreshToken), status=status.HTTP_200_OK)
    else:
      return Response({'msg': 'Invalid login'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
