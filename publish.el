;; Set the package installation directory so that packages aren't stored in the
;; ~/.emacs.d/elpa path.
(require 'package)
(setq package-user-dir (expand-file-name "./.packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
                         ("elpa" . "https://elpa.gnu.org/packages/")))

;; Initialize the package system
(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

;; Set theme
(use-package exotica-theme
  :config (load-theme 'exotica t)
  :ensure t)

;; Install dependencies
(package-install 'htmlize)
(setq org-html-htmlize-output-type 'inline-css)

;; Disable backups
(setq make-backup-files nil)

;; Load the publishing system
(require 'ox-publish)

;; Customize the HTML output
(setq org-html-validation-link nil             ;; Don't show validation link
	  org-html-head-include-scripts nil        ;; Use own scripts
	  org-html-head-include-default-style nil  ;; Use own styles
      org-html-htmlize-output-type 'css)
	  ;;org-html-head "<link rel=\"stylesheet\" href=\"https://cdn.simplecss.org/simple.min.css\" />")

(setq org-src-preserve-indentation t)

;; Custom sitemap entries
(defun my/org-sitemap-date-entry-format (entry style project)
  "Format ENTRY in org-publish PROJECT Sitemap format ENTRY ENTRY STYLE format that includes date."
  (let ((filename (org-publish-find-title entry project)))
    (if (= (length filename) 0)
        (format "*%s*" entry)
      (format "{{{timestamp(%s)}}} [[file:%s][%s]] "
              (format-time-string "%Y-%m-%d"
                                  (org-publish-find-date entry project))
              entry
              filename))))

;; Set a macros
(setq org-export-global-macros
      '(("timestamp" . "@@html:<span class=\"timestamp\">[$1]</span>@@")))


;; Preambles
(defvar pages-html-preamble
  "<nav id='topnav'>
<a class='homeLink' href='index.html'>Home</a>
<a class='blogLink' href='blog.html'>Blog</a>
<a class='aboutLink' href='about.html'>About</a>
<div class='sparse'>
<div class='theme-changer'></div>
</div>
</nav>")

(defvar blog-html-preamble
  "<nav id='topnav'>
<a class='homeLink' href='/index.html'>Home</a>
<a class='blogLink' href='/blog.html'>Blog</a>
<a class='aboutLink' href='/about.html'>About</a>
<div class='sparse'>
<div class='theme-changer'></div>
</div> 
</nav>")

;; Postambles
;;(defvar pages-html-postamble
;;  "<footer>
;;     <div class='theme-changer'></div>
;;     Copyright 2022 %a. <br>
;;     Last updated %C. <br>
;;     This blog was built with %c and <a href='#'>the code</a> was open sourced. Hosted on <a href='img/host.jpg'>my home Raspberry Pi</a>.
;;   </footer>")

(defvar pages-html-postamble
  "<footer>
    <div id='socmedia'>
    </div>
    <div id='info'>
    </div>
    <div id='bottom'>
    </div>
  </footer>")

(defvar blog-html-postamble
  "<div id='remark42'></div>
  <script>
	var remark_config = {
		host: 'https://remark42.thewebmasterp.com',
		site_id: 'remark42.thewebmasterp.com',
	}
  </script>
  <script>!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement('script'),c='.js',d=n.head||n.body;'noModule'in r?(r.type='module',c='.mjs'):r.async=!0,r.defer=!0,r.src=remark_config.host+'/web/'+e[o]+c,d.appendChild(r)}}(remark_config.components||['embed'],document);</script>
  <footer>
     <div class='theme-changer'></div>
     Copyright 2022 %a. <br>
     Last updated %C. <br>
     This blog was built with %c and <a href='#'>the code</a> was open sourced. Hosted on <a href='../img/host.jpg'>my home Raspberry Pi</a>.
  </footer>")

;; Define the publishing project
(setq org-publish-project-alist
	  `(
		("blog"
		 :base-directory "./content/blog"
		 :publishing-directory "./public/blog"
		 :publishing-function org-html-publish-to-html
		 :base-extension "org"
		 :recursive t
		 :html-preamble ,blog-html-preamble
		 :html-postamble ,blog-html-postamble
		 :auto-sitemap t
		 :sitemap-title "Blog Posts"
		 :sitemap-filename "index.org"
		 :sitemap-format-entry my/org-sitemap-date-entry-format
		 :sitemap-sort-files anti-chronologically)

		("pages"
		 :base-directory "./content"
		 :publishing-directory "./public"
		 :publishing-function org-html-publish-to-html
		 :base-extension "org"
		 :recursive t
		 :html-preamble ,pages-html-preamble
		 :html-postamble ,pages-html-postamble)

		("static"
		 :base-directory "./content"
		 :publishing-directory "./public"
		 :publishing-function org-publish-attachment
		 :base-extension "css\\|map\\|txt\\|jpg\\|gif\\|png\\|svg\\|js\\|woff\\|woff2\\|html"
		 :recursive t)

		("thewebmasterp.com"
		 :components ("pages" "blog" "static"))
		))

;; Generate the site output
(org-publish "thewebmasterp.com" t)


(message "Build complete!")

