class Api::TodosController < ApplicationController
  def create
    Todo.create!(todo_params)
  end

  def update
    current_todo = Todo.find_by(params[:id])
    current_todo.update!(todo_params)
  end

  def destroy
    current_todo = Todo.find_by(params[:id])
    current_todo.destroy!
  end




  private

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end
end
