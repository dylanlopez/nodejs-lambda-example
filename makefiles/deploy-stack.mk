stack.deploy: ##@aws Despliega el stack de cloudformation de la funcion lambda.
	aws cloudformation deploy \
	--template-file ./cloudformation/template.yaml \
	--stack-name $(PROJECT_NAME) \
	--parameter-overrides \
		SubnetIds=$(SUBNET_IDS) \
		VpcId=$(VPC_ID) \
		SourceFunctionBucket=$(INFRA_BUCKET) \
		SourceFunctionKey=$(LAMBDA_FUNCTION_S3_KEY) \
		ProjectName=$(PROJECT_NAME) \
	--capabilities CAPABILITY_NAMED_IAM \
	--region $(DEPLOY_REGION)

stack.delete: ##@aws Elimina el stack de cloudformation.
	aws cloudformation delete-stack --stack-name $(PROJECT_NAME) --region $(DEPLOY_REGION)

env.sync: ##@aws Sync configs for application from AWS S3.
	aws s3 sync s3://$(INFRA_BUCKET)/config/container/$(PRODUCT)/$(ENV)/fn-$(FUNCTION)/ $(PWD)/app

deploy.sync.params: ##@aws Sync parameters for deployment from S3.
	aws s3 sync s3://$(INFRA_BUCKET)/config/deploy/$(PRODUCT)/$(ENV)/fn-$(FUNCTION)/ $(PWD)/deploy/