from django.conf.urls import url 
from api.views import auth_view, folder_view

urlpatterns = [ 
    #url(r'^api/tutorials$', views.tutorial_list),
    #url(r'^api/tutorials/(?P<pk>[0-9]+)$', views.tutorial_detail),
    url(r'^api/signup', auth_view.sign_up),
    url(r'^api/login', auth_view.login),
    url(r'^api/folder', folder_view.create),
    url(r'^api/folder/(?P<id>[0-9]+)$', folder_view.delete),
]
