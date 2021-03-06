class Api::UsersController < ApplicationController
	def create
		@user = User.new(user_params)
		@user.bio = "";
		@user.location = "";

		if @user.save
			login!(@user)
			render "api/users/show"
		else
			render json: @user.errors.full_messages, status: 422
		end
	end

	def update
		@user = User.find_by_credentials(params[:user][:username],
			params[:user][:password])
		
		if @user
			unless params[:user][:avatar_url].blank?
				avatar_errors = @user.attach_avatar!(params[:user][:avatar_url])

				if avatar_errors
					return render json: [avatar_errors[0]], status: avatar_errors[1]
				end
			end

			if @user.update_attributes(update_params)
				render "api/users/show"
			else
				render json: @user.errors.full_messages, status: 422
			end
		else
			render json: ["Invalid credentials"], status: 401
		end
	end

	def index
		@users = User.all
		render "api/users/index"
	end

	def show
		@user = User.find_by(id: params[:id])
		render "api/users/show"
	end

	private

	def user_params
		params.require(:user).permit(:username, :password)
	end

	def update_params
		params.require(:user).permit(:bio, :location)
	end
end