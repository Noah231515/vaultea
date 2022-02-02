from django.conf.urls import url 
from django.urls import path

from api.views import auth_view, folder_view
from api.views import password_view

urlpatterns = [ 
    #url(r'^api/tutorials$', views.tutorial_list),
    #url(r'^api/tutorials/(?P<pk>[0-9]+)$', views.tutorial_detail),
    url(r'^api/signup', auth_view.sign_up),
    url(r'^api/login', auth_view.login),
    path('api/folder', folder_view.FolderCrud.as_view()),
    path('api/folder/<int:folder_id>', folder_view.FolderCrud.as_view()),
    path('api/password', password_view.PasswordCrud.as_view()),
]
