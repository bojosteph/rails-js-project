class User < ApplicationRecord
  has_many :events, foreign_key: 'planner_id'
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  devise :omniauthable, omniauth_providers: %i[facebook]
  def self.find_or_create_by_omniauth(auth_hash)
    where(email: auth_hash['info']['email']).first_or_create do |user|
      user.password = Devise.friendly_token[0,20]
    end
  end

end
