from django.http.response import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, views
from rest_framework.response import Response
from api.models import User
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from api.serializers import LoginFormSerializer, SignUpFormSerializer
import json

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def sign_up(request):
  serializer = SignUpFormSerializer(data=json.loads(request.body))
  if serializer.is_valid():
    data = serializer.data
    new_user = User.objects.create(username=data['username'], is_active=True)
    new_user.key = data["key"]
    User.set_password(new_user, data['password'])
    new_user.save()
    return Response(None, status=status.HTTP_200_OK)
  else:
    return Response({'key': 'value'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def user_login(request):
  serializer = LoginFormSerializer(data=json.loads(request.body))  
  if serializer.is_valid():
    data = serializer.data
    authenticated_user = authenticate(request, username=data['username'], password=data['password'])
    if authenticated_user:
      login(request, authenticated_user)
      return JsonResponse({"id": authenticated_user.id,
                          "username": authenticated_user.username,
                          },
                          status=status.HTTP_200_OK)
    else:
      return Response({'msg': 'Invalid login'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  else:
    return Response({'msg': 'Invalid form'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
