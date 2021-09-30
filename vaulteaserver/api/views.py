from django.shortcuts import render
from rest_framework.decorators import api_view

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
  print(request)
     # GET all published tutorials