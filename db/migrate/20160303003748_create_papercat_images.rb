class CreatePapercatImages < ActiveRecord::Migration
  def change
    create_table :papercat_images do |t|
      t.string :file
    end
  end
end
