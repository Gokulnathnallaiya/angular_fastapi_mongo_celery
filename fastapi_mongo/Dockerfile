FROM python:3.7
COPY kaggle.json /root/.kaggle/kaggle.json
WORKDIR /app
COPY requirements.txt .

RUN pip install -r requirements.txt
COPY . /app
CMD [ "python", "main.py" ]

#docker run --name angularb --network mynetwork -p 4700:80 --rm -d frontend:angularv1
#docker run --name fastapib --network mynetwork -p 8000:8000 --rm -d fastapi-backend
#docker run --name mysqlb --network mynetwork -e MYSQL_ROOT_PASSWORD=root -p 3305:3306 -d mysql