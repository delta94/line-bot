# Lazy git
function lg() {
    git add .
    if [ -z "$1" ] && [ -z "$2" ]
    then
      git commit -m "$(curl -s whatthecommit.com/index.txt)"
    else
      git commit -a -m "$1"
    fi
    git push
}

lg "junk commit"
lg # Will random the commit message