import os 
import threading
import requests, random
from dhooks import Webhook
webhook = 'https://discord.com/api/webhooks/1167933381196140544/v4T2b9Nye_bTQqn53_ob1bbigDh9hY-UIOciZizyR6J_0MJWoYgnz4ODKEwgplRbIo8x'
MIN_GROUP_ID = 300000
MAX_GROUP_ID = 320000

# Función generadora para obtener IDs de grupos
def get_group_ids():
    for group_id in range(MIN_GROUP_ID, MAX_GROUP_ID + 1):
        yield group_id

# Función para encontrar grupos abiertos y enviarlos a Discord
def find_open_groups():
    open_groups = [group_id for group_id in get_group_ids() if is_open_group(group_id)]
    if open_groups:
        content = "Encontré los siguientes grupos abiertos:\n{0}".format("\n".join(f'https://www.roblox.com/groups/{i}' for i in open_groups))
        requests.post(webhook, data={"content": content})
        print(f"Encontré {len(open_groups)} grupos abiertos en el rango de {MIN_GROUP_ID} a {MAX_GROUP_ID}")

# Función auxiliar para verificar si un grupo es abierto
def is_open_group(group_id):
    try:
        group = requests.get(f"https://groups.roblox.com/v1/groups/{group_id}")
        group_data = group.json()
        return group_data.get('publicEntryAllowed', False) and group_data['owner'] is None
    except requests.exceptions.HTTPError as e:
        print(f"Error al obtener el grupo {group_id}: {e.response.status_code}")
    except requests.exceptions.ConnectionError as e:
        print(f"Error al obtener el grupo {group_id}: {e.request.url}")
    except requests.exceptions.RequestException as e:
        print(f"Error al obtener el grupo {group_id}: {e}")
    return False

# Ejecutar la función principal
find_open_groups()
