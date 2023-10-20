# Use an official python runtime as a parent image
FROM python:3.8.18

ENV PYTHONUNBUFFERED 1

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY requirements.txt ./

# Install dependencies
# if you are behind a proxy, uncomment the following line
RUN pip install --proxy http://10.108.42.94:3128 -r requirements.txt
# otherwise, comment the previous line and uncomment the following one
# RUN pip install -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Expose port 8000 for the container
EXPOSE 8000

RUN python manage.py migrate

# Start the server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


# docker build -t fastshare-back .
# docker run -p 8000:8000 --name fsb fastshare-back

# docker run -p 8000:8000 --mount type=bind,source=/home/g21778/Documents/GitHub/FastShare/back-end/FastShare,target=/app --name fsb fastshare-back