from rest_framework.exceptions import APIException

class NotFoundEmployee(APIException):
    status_code = 404
    default_detail = 'Funcao nao encontrada'
    default_code = 'not_found_employee'

class NotFoundGroup(APIException):
    status_code = 404
    default_detail = 'Grupo nao encontrada'
    default_code = 'not_found_group'

class RequiredFields(APIException):
    status_code = 400
    default_detail = 'Envie todos os campos obrigatorios'
    default_code = 'error_required_field'

class NotFoundTaskStatus(APIException):
    status_code = 404
    default_detail = 'Status da tarefa nao encontrado'
    default_code = 'not_found_task_status'

class NotFoundTask(APIException):
    status_code = 404
    default_detail = 'Tarefa nao encontrada'
    default_code = 'not_found_task'