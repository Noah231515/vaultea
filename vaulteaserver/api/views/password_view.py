from django.forms import model_to_dict
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from api.models import Password
from api.permissions.password_permission import PasswordPermission

@api_view(['PUT'])
@permission_classes([PasswordPermission])
def updateStarred(request, password_id):
  password = Password.objects.get(id=password_id)
  password.starred = not password.starred
  password.save()
  return Response(model_to_dict(password), status=status.HTTP_200_OK)
