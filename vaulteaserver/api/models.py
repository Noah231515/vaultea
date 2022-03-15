from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.db.models.deletion import RESTRICT
from django.conf import settings

user = settings.AUTH_USER_MODEL

# TODO: Refactor Note/Password to use base class with audit data, expire_date, note will compress our tables down
# Additional, more specific data dan be foreign keyed to it
# Additional data would extend base data
# So we have Item with data
# MetaData with data type of pattern

class BaseObject(models.Model):
    name = models.CharField(max_length=512, blank=False, null=False)
    starred = models.BooleanField(default=False, null=False)

    class Meta:
        abstract = True

class User(AbstractUser):
    key = models.CharField(max_length=500, blank=False, null=False)
class Vault(models.Model):
    user_id = models.ForeignKey(user, on_delete=models.RESTRICT, blank=False, null=False)

class Folder(BaseObject):
    vault_id = models.ForeignKey(Vault, on_delete=models.RESTRICT, blank=False, null=False)
    folder_id = models.ForeignKey('self', on_delete=models.RESTRICT, blank=True, null=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=100, blank=True, null=True)

class Note(models.Model):
    folder_id = models.ForeignKey(Folder, on_delete=models.RESTRICT, blank=True, null=True)
    vault_id = models.ForeignKey(Vault, on_delete=models.RESTRICT, blank=True, null=True)
    note = models.CharField(max_length=1000)

class Password(BaseObject):
    vault_id = models.ForeignKey(Vault, on_delete=RESTRICT, blank=False, null=False)
    folder_id = models.ForeignKey(Folder, on_delete=RESTRICT, blank=True, null=True)
    username = models.CharField(max_length=512, blank=False, null=False, default="")
    password = models.CharField(max_length=512, blank=False, null=False)
    note = models.CharField(max_length=1000, blank=True, null=True)
    expire_date = models.DateTimeField(blank=True, null=True)
