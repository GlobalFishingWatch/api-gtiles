FROM gcr.io/google_appengine/nodejs

# Use a newer version of nodejs
RUN install_node 8.9.1

# Setup the project directory
RUN mkdir -p /opt/project
WORKDIR /opt/project

# Setup application dependencies
copy package*.json /opt/project
RUN npm --unsafe-perm install

# Setup the application code
COPY src /opt/project/src

