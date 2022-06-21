from . import core
import json
import re


ID_LENGTH = 6


def _format_test_id(number_id):
    number_id = hex(number_id)[2:]
    while len(number_id) < ID_LENGTH:
        number_id = "0" + number_id
    return number_id


def _get_all_test_id():
    list_id = core.load_file("packs.conf").read().split(" ")
    list_id = [ int(el, 16) for el in list_id if el ]
    return list_id


def _get_free_test_id():
    list_id = _get_all_test_id()
    #
    for cur_id in range(1, 16 ** ID_LENGTH):
        if not (cur_id in list_id):
            return _format_test_id(cur_id)
    return "<list_id> overflow!"


def get_pack_content(test_id):
    test_id = test_id.replace("-", "")
    content = core.load_file("packs/{}.json".format(test_id)).read()
    #
    return content


def find_packs(search_key):
    packs = _get_all_test_filename()
    #
    if search_key.startswith("#"):
        return _search_hashtag(packs, search_key[1:])
    else:
        return _search_word(packs, search_key)


def _get_all_test_filename():
    with core.load_file("packs.conf") as file:
        filenames = file.read().split()
    #
    filenames = [ i for i in filenames if i ]
    #
    packs = []
    for i in filenames:
        i += ".json"
        with core.load_file("packs/{}".format(i)) as file:
            packs.append(json.load(file))
    #
    return packs


def _search_hashtag(packs, search_key):
    return packs


def _search_word(packs, search_key): 
    filtered_packs = sorted(packs, key=lambda element: len(re.findall(search_key, str(element))))
    filtered_packs = [ i for i in filtered_packs if len(re.findall(search_key, str(i))) > 0 ]
    filtered_packs = filtered_packs[::-1]
    return filtered_packs


def add_pack_to_database(test_id):
    pass


def remove_pack_from_database(test_id):
    pass


def send_pack_to_admin(pack):
    pass


def add_pack(new_pack):
    new_test_id = _get_free_test_id()
    #
    return str(new_pack)
    new_pack.save("/var/www/remtest/remtest_server/server_core/packs/{}.json".format(new_test_id))

    #
    return str(new_test_id)
