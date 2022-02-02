import json

from django.http.response import HttpResponse, JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers.folder_serializer import FolderSerializer
from api.models import Folder
from api.serializers.password_serializer import PasswordSerializer

class PasswordCrud(APIView):

  def post(self, request):
    serializer = PasswordSerializer(data=json.loads(request.body))
    if serializer.is_valid(raise_exception=True):
      new_password = serializer.create(serializer.data)

    return Response(model_to_dict(new_password), status=status.HTTP_200_OK)
