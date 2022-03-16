from django.conf.urls import url 
from django.urls import path

from api.views import auth_view, folder_crud, folder_view, password_crud, password_view

urlpatterns = [
    url(r'^api/signup', auth_view.sign_up),
    url(r'^api/login', auth_view.login),
    path('api/folder', folder_crud.FolderCrud.as_view()),
    path('api/folder/<int:folder_id>', folder_crud.FolderCrud.as_view()),
    path('api/folder/<int:folder_id>/updateStarred', folder_view.updateStarred),
    path('api/password', password_crud.PasswordCrud.as_view()),
    path('api/password/<int:password_id>', password_crud.PasswordCrud.as_view()),
    path('api/password/<int:password_id>/updateStarred', password_view.updateStarred),
]
