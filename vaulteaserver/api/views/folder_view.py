import json
from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.folder_serializer import FolderSerializer
from api.models import Folder
from api.permissions.folder_permission import FolderPermission

class FolderCrud(APIView):
  permission_classes = [FolderPermission]

  def post(self, request):
    serializer = FolderSerializer(data=json.loads(request.body))
    if serializer.is_valid(raise_exception=True):
      new_folder = serializer.create(serializer.data, request.user)

    return Response(model_to_dict(new_folder), status=status.HTTP_200_OK)

  def put(self, request, folder_id):
    serializer = FolderSerializer(data=json.loads(request.body))
    if serializer.is_valid(raise_exception=True):
      updated_folder = serializer.update(serializer.data, folder_id)
      
    return Response(model_to_dict(updated_folder), status=status.HTTP_200_OK)
  
  def delete(self, request, folder_id):
    Folder.objects.get(id=folder_id).delete()
    return Response(folder_id, status=status.HTTP_200_OK)
