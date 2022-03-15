import json

from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Password
from api.serializers.password_serializer import PasswordSerializer
from api.permissions.password_permission import PasswordPermission

class PasswordCrud(APIView):
  permission_classes = [PasswordPermission]

  def post(self, request):
    serializer = PasswordSerializer(data=json.loads(request.body))
    if serializer.is_valid(raise_exception=True):
      new_password = serializer.create(serializer.data, request.user)

    return Response(model_to_dict(new_password), status=status.HTTP_200_OK)
  
  def put(self, request, password_id):
    serializer = PasswordSerializer(data=json.loads(request.body))
    if serializer.is_valid(raise_exception=True):
      updated_password = serializer.update(serializer.data, password_id)
    
    return Response(model_to_dict(updated_password), status=status.HTTP_200_OK)
  
  def delete(self, request, password_id):
    Password.objects.get(id=password_id).delete()
    return Response(password_id, status=status.HTTP_200_OK)
