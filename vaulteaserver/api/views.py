from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from api.serializers import SignUpFormSerializer
import json

# # Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])
# def tutorial_list(request):
#     # GET list of tutorials, POST a new tutorial, DELETE all tutorials
 
 
# @api_view(['GET', 'PUT', 'DELETE'])
# def tutorial_detail(request, pk):
#     # find tutorial by pk (id)
#     try: 
#         tutorial = Tutorial.objects.get(pk=pk) 
#     except Tutorial.DoesNotExist: 
#         return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
#     # GET / PUT / DELETE tutorial
    
        
# @api_view(['GET'])
# def tutorial_list_published(request):
#     # GET all published tutorials

@api_view(['POST'])
def sign_up(request):
  serializer = SignUpFormSerializer(data=json.loads(request.body))
  if serializer.is_valid():
    data = serializer.data
    new_user = User.objects.create(username=data['username'], password=data['password'], email=data['email'])
    token = Token.objects.create(user=new_user)
    return JsonResponse({'token': token.key}, status=status.HTTP_200_OK)
  else:
    return Response({'key': 'value'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)