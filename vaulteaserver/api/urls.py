from django.conf.urls import url 
from api import views 
 
urlpatterns = [ 
    #url(r'^api/tutorials$', views.tutorial_list),
    #url(r'^api/tutorials/(?P<pk>[0-9]+)$', views.tutorial_detail),
    url(r'^api/signup', views.sign_up),
    url(r'^api/login', views.user_login),
]
