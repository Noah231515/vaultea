from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import RESTRICT

class Vault(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.RESTRICT, blank=False, null=False)
    
class Folder(models.Model):
    vault_id = models.ForeignKey(Vault, on_delete=models.RESTRICT, blank=False, null=False)
    name = models.CharField(max_length=100, blank=False, null=False)
    
class Note(models.Model):
    folder_id = models.ForeignKey(Folder, on_delete=models.RESTRICT, blank=True, null=True)
    vault_id = models.ForeignObject(Vault, on_delete=models.RESTRICT, blank=True, null=True)
    note = models.CharField(max_length=1000)

class Password(models.Model):
    vault_id = models.ForeignKey(Vault, on_delete=RESTRICT, blank=True, null=True)
    folder_id = models.ForeignKey(Folder, on_delete=RESTRICT, blank=True, null=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    password = models.CharField(max_length=512, blank=False, null=False)
    expire_date = models.DateTimeField(blank=True, null=True)
    