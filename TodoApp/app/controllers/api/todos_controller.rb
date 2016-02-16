class Api::TodosController < ApplicationController
  def create
    output = Todo.create!(todo_params)
    render :json => output
  end

  def update
    current_todo = Todo.find_by(params[:id])
    current_todo.update!(todo_params)
    redirect_to root_url
  end

  def destroy
    current_todo = Todo.find_by(params[:id])
    current_todo.destroy!
    redirect_to root_url
  end

  def index
    todos = Todo.all
    render :json => todos
  end




  private

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end
end
