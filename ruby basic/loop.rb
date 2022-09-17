# counter = 1

# while counter < 11
#   print "I'm at #{counter}"
#   counter = counter + 1
#   # counter += 1 # same as above
#   # counter++ # this doesn't work in ruby
# end

# UNTIL

# counter = 1

# until counter > 10
#   print "I'm at #{counter}"
#   counter = counter + 1
# end

# BREAK

# print "How many should I loop?"
# num = gets.to_i

# i = 0
# while i < num
#   print "Hello #{i}"
#   i += 1
#   break if i > 5
# end

#  LOOP DO

# x = 0
# loop do
#   puts x
#   x += 1
#   break if x == 13
# end

# FOR LOOP
# for number in 1..10
#   puts number
# end

# number is variable set to the current element being iterated over
# Note: .. means INCLUSIVE of 10, and ... means EXCLUSIVE of 10

# for number in (1..100).step(5)
#   puts number
# end

# This will output 1,6,11,16... etc.
# 10.times{puts "Hello CodeCore"}

puts 1.is_a? Integer
puts 1.is_a? String
puts "asdf".is_a? Integer
puts "asdf".is_a? String





# e.g
sum = 0

puts "Enter a number to add up or type exit for the sum"
input = gets.chomp

until input == "exit"
  puts "Enter a number to add up or type exit for the sum"
  num = input.to_i
  sum += num
  input = gets.chomp
end

puts "sum is #{sum}"

