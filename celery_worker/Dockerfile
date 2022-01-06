FROM python:3.7
COPY requirements.txt .
RUN pip install -r requirements.txt


COPY kaggle.json /root/.kaggle/kaggle.json
RUN chmod 600 /root/.kaggle/kaggle.json
WORKDIR /simple_worker
# layer caching for faster builds


#COPY app.py /app.py
COPY . /simple_worker


#-Q celery_worker
ENTRYPOINT ["celery","-A","tasks", "worker", "--loglevel=info"]