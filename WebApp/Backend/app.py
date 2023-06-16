from flask import Flask, request, redirect, url_for, jsonify
from flask_restful import Api, Resource, reqparse
from pymongo import MongoClient
from flask_cors import CORS, cross_origin #comment this on deployment
#mport flask_praetorian
#from api import HelloApiHandler
import csv, json
from flask_pymongo import PyMongo
from KnowledgeGraph import KnowledgeGraph
import os

app = Flask(__name__)
CORS(app) #comment this on deployment
api = Api(app)


client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
# mongo = PyMongo(app)
db_users = client.UserProfile
db_KG = client.KnowledgeGraph
# print(db_users["Users"].find_one({"Username": "Admin"}))
# print(db_KG["Nodes"].find_one({"type": "Architect"}))

# users_db = mongo_client.get_database("UserProfile")
# users_col = PyMongo.collection.Collection('UserProfile', 'Users')
# @app.route('/', methods=["GET"])


@app.route('/api/create_an_account/', methods=["POST"])
def home():
    # print("We're here!!!")
    # if request.method == 'POST':
    #   print("POST")
    # elif request.method =='GET':
    #   print("get")
    # print(request.json)
    client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
    # mongo = PyMongo(app)
    db_users = client.UserProfile
    db_KG = client.KnowledgeGraph
    #print(db_users["Users"].find_one({"Username": "Admin"}))
    #print(db_KG["Nodes"].find_one({"type": "Architect"}))
    email = (request.json)["email"]
    username = (request.json)["username"]
    password = (request.json)["password"]

    if db_users["Users"].find_one({"Username": username}):
      return {
        'status': False
      }

    else:
      db_users['Users'].insert_one({
          "Username": username,
          "Password": password,
          "Email": email,
          "History": [],
          # "BookMark": [],
          "Project": []
      })
      return {
        'status': True
        }


@app.route('/api/recommendation/', methods = ["GET", "POST"])
def recommend():
    node_name = request.json['current_node']
    view_distance = request.json['view_distance']
    print(node_name)
    print(view_distance)
    name_list = '\\names.txt'
    files = "\\KG_Data\\"
    kg = KnowledgeGraph.load_from_csv(files,name_list)
    result = kg.recommend(node_name, view_distance)
    recommendation_num = 0
    data = []
    for name in result:
        recommendation_num += 1
        data.append({"node_name": name, \
            "predecessors": result[name]})

    result = {"recommendation_num": recommendation_num, \
      "data": data}
    return result


@app.route('/api/login/', methods=["POST","GET"])
def zeus():
    print("Entered Login")

    client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
    username = (request.json)["username"]
    password = (request.json)["password"]
    db_users = client.UserProfile

    if db_users["Users"].find_one({"Username": username}) and db_users["Users"].find_one({"Password": password}):
      message = True
      print("good")
    else:
      message = False
      print("wrong!")

    return {
      'message': message
      }

@app.route('/api/history/', methods=["POST"])
def his():
    print("Entered History")
    Precedent = (request.json)["Precedent"]
    User = (request.json)["User"]

    if (User != None):
      #Add in condition, if item is in array, do not add it in again
      if db_users["Users"].find_one({"History": Precedent}):
        return {'message':"Precedence is already in History"}
      
      else:
        client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
        client.UserProfile.Users.update(
          {"Username":User},
          {
            "$push": {"History" : Precedent}
          }
        )
        return {'message':"Done with Entered History"}


@app.route('/api/get_history/', methods=["POST"])
def get_his():
    print("Entered get_history")
    User = (request.json)["User"]
    print(User)

    if (User == None):
      return {
      'message': "Not logged in"
      }

    # client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
    # db_users = client.UserProfile
    x = (db_users["Users"].find_one({"Username": User}))["History"]

    return {
      'message': x
      }

@app.route('/api/delete_history/', methods=["POST"])
def delete_his():
    print("Entered delete_history")
    User = (request.json)["a"]
    print(User)

    if (User == None):
      return {
      'message': "Not logged in"
      }

    client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
    client.UserProfile.Users.update(
      {"Username":User},
      {
        "$set": {"History" : []}
      }
    )
    return "Done with Deleted History"


@app.route('/api/AddProject/', methods=["POST"])
def AddProject():
    print("Entered Add Project")
    newproject = (request.json)["newproject"]
    User = (request.json)["u"]
    print(newproject)
    print(User)

    if (User == None):
      return {
      'message': "Not logged in"
      }

    client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
    client.UserProfile.Users.update(
      {"Username":User},
      {
        "$push": {"Project" : {newproject:[]} }
      }
    )
    return "Done with Adding Projects"




@app.route('/api/get_projects/', methods=["POST"])
def get_projects():
    print("Entered get_projects")
    User = (request.json)["User"]
    print(User)

    array = []

    if (User == None):
      return {
      'message': "Not logged in"
      }

    client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
    db_users = client.UserProfile
    x = (db_users["Users"].find_one({"Username": User}))["Project"]

    return {
      'message': x
      }

    # for count in x :
    #   print(count)
    #   array.append(list(count.keys())[0])
    
    # return {
    #   'message': array
    #   }








@app.route('/api/get_bookmarks/', methods=["POST"])
def get_bookmarks():
    print("Entered get_bookmarks")
    User = (request.json)["User"]
    project = (request.json)["Project"]
    print(User)
    print(project)

    if (User == ""):
      return {
        'text': "Not logged in",
      }

    if ((project == "") or (project == None)):
      return{
        'text': "Create a project to save your bookmarks!",
      }

    db_users = client.UserProfile
    x = (db_users["Users"].find_one({"Username": User}))["Project"]

    #for each dictionary in the Project array
    for i in x :
      #print(list(i.values())[0])
      if (list(i.keys())[0] == project) :
        return {
          'message': list(i.values())[0]
          }




@app.route('/api/AddBookMark/', methods=["POST"])
def AddBookMark():
    print("Entered Add BookMark")
    newbookmark = (request.json)["Precedent"]
    User = (request.json)["User"]
    project = (request.json)["Project"]
    bk = (request.json)["bk"]
    print(newbookmark)
    print(User)
    print(project)
    print(bk)

    if ((User == "") or (User == None)):
      return {
        'message': "Please login to save bookmark",
      }

    if ((project == "") or (project == None)):
      return{
        'message': "Create a project to save your bookmarks!",
      }

    x = (db_users["Users"].find_one({"Username": User}))["Project"]

    #delete
    if (bk == 1):
      for i in x :
        if (list(i.keys())[0] == project) :
          db_users.Users.update(
          {"Username":User, ("Project." + project):list(i.values())[0]},
            {
              "$pull": {("Project.$." + project) : newbookmark}
            }
          )
          return {
          'message': "Removed Bookmark"
          }
    
    #update
    else:
      #for each dictionary in the Project array
      for i in x :
        #print(list(i.values())[0])
        if (list(i.keys())[0] == project) :
          for n in list(i.values())[0]:
            if n == newbookmark:
              return {
                'message':"Precedence is already in BookMark"
                }
          
          #add bookmark in project
          db_users.Users.update(
            {"Username":User, ("Project." + project):list(i.values())[0]},
            {
              "$push": {("Project.$." + project) : newbookmark}
            }
          )
          break


      # {
      # Project: [ { Best: [ "falling water", "T3" ] }, { Zeus: [ "School", "Airport" ] } ]
      # }

      # {
      #   _id: something,
      #   recipients: [{id:1, name:[a,b], isread:false}, {id:2, name:"John", isread:false}]
      # }

      # collection.update(
      #   {_id:something, 'recipients.id': 2}, 
      #   {"$set": {'recipients.$': {
      #     isread: true,
      #     fullname: 'jonathan'
      # }}}, function (err) {...

    #   collection.update(
    #     {_id:something, 'recipients.id': 2}, 
    #     {"$set": {'recipients.$.isread': true,
    #     'recipients.$.fullname': 'jonathan'
    #   }}, function (err) {...


        # else:
        #   db_users.Users.update(
        #     {"Username":User},
        #     {
        #       "$push": {"Project" : newbookmark}
        #     }
        #   )
    return {'message':"Added Bookmark"}







@app.route('/api/search/', methods=["POST", "GET"])
def search():
    print("Entered search")
    search = str(request.json)
    print(search)
    print(search[16:19])

    if (search[16:19] == "Fal" or search[16:19] == "fal"):
      return {
      'message': "Falling Water"
      }

    # elif (search[16:19] == "the" or search[16:19] == "The"):
    #   return {
    #   'message': {"The Centre Pompidou", "The Interlace", "The Millennium Dome"}
    #   }

    # client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')
    # db_users = client.UserProfile
    # x = (db_users["Users"].find_one({"Username": User}))["Project"]

    return {
      'message': "No results found"
      }







# @app.route('/api/users', methods=["POST","GET"])
# def data():
    
#     # POST a data to database
#     if request.method == 'POST':
#         body = request.json
#         username = body['Username']
#         password = body['Password']
#         email = body['Email'] 
#         # db.users.insert_one({
#         db_users['Users'].insert_one({
#             "Username": username,
#             "Password": password,
#             "Email":email
#         })
#         return jsonify({
#             'status': 'Data is posted to MongoDB!',
#             "Username": username,
#             "Password": password,
#             "Email":email
#         })

#     if request.method == 'GET':
#         allData = db_users.find()
#         dataJson = []
#         for data in allData:
#             username = data['Username']
#             password = data['Password']
#             email = data['Email']
#             dataDict = {
#                 'id': str(id),
#                 'Username': username,
#                 'Password': password,
#                 'Email': email
#             }
#             dataJson.append(dataDict)
#         print(dataJson)
#         return jsonify(dataJson)

@app.route('/api/precedence', methods=["GET"])
def get_precedence():
  
  client = MongoClient('mongodb+srv://Capstone24:team_mates@cluster0.udqjc.mongodb.net/UserProfile?retryWrites=true&w=majority')

  precedence_data= client.Precedence["Precedence_Data"]
  allData = precedence_data.find()
  dataJson = {}
  for data in allData:
    project = data['Project']
    architect = data['Architect']
    location = data['Location']
    style = data['Style']
    program = data['Program']
    label = [architect,location,style,program]
    article=data["Text"].split("\n")
    dataJson[project] = {'precedence': project,"label":label,"article":article}

    
    
  print("Data retrieved")
  return jsonify(dataJson)
  
@app.route('/api/demo/', methods=["GET"])
def test():
    return "This is working."

if __name__ == '__main__':
    app.run(debug=True)
