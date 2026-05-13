from django.db import connection
from django.shortcuts import render


def search_user(request):
    user_input = request.GET.get('username')

    query = f"SELECT * FROM users WHERE username = '{user_input}'"

    with connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor.fetchall()

    return render(request, 'search.html', {'result': result, 'input': user_input})


def equipe(request):
    membres = [
        {"nom": "MPINDA KANULAMBI GAEL", "role": "Responsable de l'infrastructure Docker", "photo": "Images/equipe/Gael.png"},
        {"nom": "MVUEZOLO TSHITSHI JORDAN", "role": "Concepteur du Dashboard React et de l'intégration API", "photo": "Images/equipe/Jordan_V2.jpg"},
        {"nom": "ONGENDANGENDA ONAKUNDJI ALPHONSE", "role": "Spécialiste des vecteurs d'attaques XSS et SQL Injection", "photo": "Images/equipe/Alphonse_V2.jpg"},
        {"nom": "AZIDAMA EGAO BELVINE", "role": "Responsable deploiement et Tests", "photo": "Images/equipe/Belvine_V2.jpg"},
        {"nom": "MULANGA MUYA ASNATH", "role": "Redaction du rapport et de la présentation!", "photo": "Images/equipe/Asnath_V2.jpg"}

    ]  
    return render(request, 'equipe.html', {'membres':membres})