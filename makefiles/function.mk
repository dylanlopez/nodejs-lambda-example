UID_LOCAL        ?= "$(shell id -u)"
GID_LOCAL        ?= "$(shell id -g)"
APP_DIR           = app
IMAGE_BUILD       = node:12.16.1-alpine3.9

install: ##@Global install dependencies.
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_BUILD} \
		yarn install

build: ##@Global Build project.
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_BUILD} \
		yarn build:prod
	@ls -al app/dist

unit.test: ##@Global Unit test.
	docker container run --workdir "/${APP_DIR}" --rm -i \
		-u ${UID_LOCAL}:${GID_LOCAL} \
		-v "${PWD}/${APP_DIR}":/${APP_DIR} \
		${IMAGE_BUILD} \
		yarn test --ci --reporters='jest-junit'

clean: ##@global Elimina el zip de la funcion lambda generada.
	@echo "Clean up package files"
	@if [ -f $(FUNCTION_NAME).zip ]; then rm $(FUNCTION_NAME).zip; fi

create.zip: ##@global Empaqueta la funcion lambda con sus dependencias en un archivo zip con el nombre de la función.
	@rm -rf build
	@if [ ! -d ${PWD}/${APP_DIR}/build ] ; then mkdir -p ${PWD}/${APP_DIR}/build; fi
	@mkdir ${PWD}/${APP_DIR}/build/node_modules
	@cp -R ${PWD}/${APP_DIR}/dist/* ${PWD}/${APP_DIR}/build
	@cp ${PWD}/${APP_DIR}/package.json ${PWD}/${APP_DIR}/build
	@cp -R ${PWD}/${APP_DIR}/node_modules/* ${PWD}/${APP_DIR}/build/node_modules
	@cp ${PWD}/${APP_DIR}/.env ${PWD}/${APP_DIR}/build
	@echo 'List:'
	@ls -al app/build
	@cd ${PWD}/${APP_DIR}/build && zip -rq $(PROJECT_NAME).zip * .env
	@mv ${PWD}/${APP_DIR}/build/$(PROJECT_NAME).zip ./

upload.function: ##@aws Sube la funcion lambda a s3 para desplegar posteriormente.
	aws s3 cp ./$(PROJECT_NAME).zip s3://$(INFRA_BUCKET)/$(LAMBDA_FUNCTION_S3_KEY)

update.function: ##@aws Actualiza el codigo de la funcion lambda.
	aws lambda update-function-code \
	--function-name $(PROJECT_NAME) \
	--s3-bucket $(INFRA_BUCKET) \
	--s3-key $(LAMBDA_FUNCTION_S3_KEY) \
	--region $(DEPLOY_REGION)