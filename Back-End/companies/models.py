from django.db import models
#from accounts.models import User

# Create your models here.
class Enterprise(models.Model):
    name = models.CharField(max_length=175)
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)

class Employee(models.Model):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)

class TaskStatus(models.Model):
    name = models.CharField(max_length=150)
    codename = models.CharField(max_length=100)


    class Meta:
        db_table = 'companies_task_status' #nome da tabela no banco
    

class Task(models.Model):
    title = models.TextField()
    description = models.TextField(null=True)
    due_date = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    status = models.ForeignKey(TaskStatus, on_delete=models.CASCADE)
    enterprise = models.ForeignKey(Enterprise, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
