from django.db import connection
from django.shortcuts import render


def search_user(request):
    user_input = request.GET.get('username')

    query = f"SELECT * FROM users WHERE username = '{user_input}'"

    with connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor.fetchall()

    return render(request, 'search.html', {'result': result, 'input': user_input})


