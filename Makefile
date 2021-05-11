.DEFAULT_GOAL := help

## APP VARS ##
PRODUCT          = 
FUNCTION         = 

## GENERAL VARS ##
ENV                     ?= 
INFRA_BUCKET            ?= 
PROJECT_NAME             = $(PRODUCT)-$(ENV)-fn-$(FUNCTION)
LAMBDA_FUNCTION_S3_KEY   = build/lambda/$(ENV)/$(PROJECT_NAME).zip

## INCLUDE TARGETS ##
-include makefiles/*.mk