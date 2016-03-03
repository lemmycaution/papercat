class CreatePapercatDocuments < ActiveRecord::Migration
  def change
    create_table :papercat_documents do |t|
      t.string :type
      t.jsonb :data, default: {}

      t.timestamps null: false
    end
    execute "CREATE INDEX on papercat_documents USING GIN (data jsonb_path_ops);"
  end
end
