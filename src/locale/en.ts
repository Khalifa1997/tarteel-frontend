import KEYS from './keys';
import React from 'react';

interface Shape {
  messages: { [key: string]: string };
}

const EN: Shape = {
  messages: {
    // LANGUAGE
    local: 'english',

    // LOCALS
    [KEYS.LOCAL_SITELOCALE]: 'Site Language',
    [KEYS.LOCAL_CHANGELOCALE]:
      'Choose the language you want the site to display in',
    [KEYS.LOCAL_NATIVENAME]: 'English',
    [KEYS.LOCAL_SELECTLABEL]: 'Language',
    [KEYS.SETTING_TITLE]: 'Settings',
    [KEYS.LOCAL_TITLE]: 'Tarteel -  AI for Quran recitation correction',
    [KEYS.LOCAL_DESCRIPTION]:
      'Tarteel is an open-source project designed to help build digital tools to analyze the recitation of the Quran. Given the important place of reciting the Quran in the lives of Muslims, it is important to build software tools that can help ordinary Muslims recite the Quran with greater accuracy and appreciation.',
    [KEYS.LOCAL_NAME]: 'Tarteel',
    [KEYS.CURRENT_APPLICATION_VERSION]: 'Tarteel version 1.0',

    // COMMON & GENERAL
    [KEYS.HOME_WORD]: 'Home',
    [KEYS.CLICK_WORD]: 'Click',
    [KEYS.CONTRIBUTE_WORD]: 'Contribute',
    [KEYS.YES_WORD]: 'Yes',
    [KEYS.NO_WORD]: 'No',
    [KEYS.SKIP_WORD]: 'Skip',
    [KEYS.SUBMIT_WORD]: 'Submit',
    [KEYS.SAVE_WORD]: 'Save',
    [KEYS.SAVED_WORD]: 'Saved',
    [KEYS.THANK_YOU_MESSAGE]: 'Thank you!',
    [KEYS.USERS_LIST_TITLE]: 'Users List',
    [KEYS.AYAH_WORD]: 'Ayah',
    [KEYS.AYAHS_WORD]: 'Ayahs',
    [KEYS.NEXT_AYAH]: 'Next Ayah',
    [KEYS.PREVIOUS_AYAH]: 'Previous Ayah',
    [KEYS.RETRY_BUTTON_TEXT]: 'retry',
    [KEYS.SUBMIT_BUTTON_TEXT]: 'Next',
    [KEYS.CONTINUOUS_MODE_NOTE_TEXT]: 'continuous mode',
    [KEYS.CHANGE_AYAH_TEXT]: 'Click here to change Ayah',
    [KEYS.SURAH_WORD]: 'Surah',
    [KEYS.CONTINUE_READING_BUTTON_TEXT]: 'Continue Reading',
    [KEYS.RANDOM_AYAH_LINK_TEXT]: 'Random Ayah',
    [KEYS.ABOUT_LINK_TEXT]: 'About',
    [KEYS.YOUR_RECITATIONS]: 'Your Recitations',
    [KEYS.PROFILE_LINK_TEXT]: 'My Profile',
    [KEYS.MOBILE_APP_LINK_TEXT]: 'Mobile App',
    [KEYS.EVALUATE_AYAHS]: 'Evaluate Ayahs',
    [KEYS.EVALUATE_AYAHS_PAGE_TITLE]: 'Evaluate Ayahs | Tarteel',
    [KEYS.GET_STARTED]: 'Get Started',
    [KEYS.PARTNERS_LINK_TEXT]: 'Partners',
    [KEYS.PREVIOUS_WORD]: 'Prev',
    [KEYS.DONATE_LINK_TEXT]: 'Donate',

    // AYAH PICKER
    [KEYS.AYAH_PICKER_TITLE]: 'Pick an Ayah',
    [KEYS.AYAH_PICKER_SEARCH_PLACEHOLDER]: 'Search (in Arabic)',
    [KEYS.AYAH_PICKER_BACK_BUTTON_TEXT]: 'To Surah',

    // SURAH PICKER
    [KEYS.SURAH_PICKER_TITLE]: 'Pick a Surah',
    [KEYS.SURAH_PICKER_SEARCH_PLACEHOLDER]: 'Search (in English/Arabic)',
    [KEYS.SURAH_PICKER_BACK_BUTTON_TEXT]: 'Back Home',

    // DEMOGRAPHICS PAGE
    [KEYS.DEMOGRAPHICS_PAGE_TITLE]: 'Demographic Data | Tarteel',
    [KEYS.DEMOGRAPHICS_PAGE_EDIT_DATA_TEXT]: 'Edit Your Data',
    [KEYS.DEMOGRAPHICS_THANKS_TEXT]:
      'Thank you! <span className="one-more">One more thing... </span>',
    [KEYS.DEMOGRAPHICS_FORM_SUBMIT_BUTTON_TEXT]: "that's me",
    [KEYS.DEMOGRAPHIC_INFO_LINK_TEXT]: 'Demographic info',
    [KEYS.DEMOGRAPHIC_PAGE_FIRST_PARAGRAPH_1]:
      'With your help, we have reached a total of',
    [KEYS.DEMOGRAPHIC_PAGE_FIRST_PARAGRAPH_2]:
      "recordings. That's great, but at Tarteel, we're also committed to making sure that our recordings reflect recitations by both women and men and from the different ethnicities and ages that make up the Muslim ummah.",
    [KEYS.DEMOGRAPHIC_PAGE_FIRST_PARAGRAPH_3]:
      'Sharing your demographic info helps us tailor the machine learning models to provide a considerably greater accuracy for Tarteel.',
    [KEYS.DEMOGRAPHIC_PAGE_SECOND_PARAGRAPH]:
      "Help us assess how well we're doing by telling us a little bit about yourself...",

    // GENDER INPUT
    [KEYS.GENDER_INPUT_LABEL]: 'Gender',
    [KEYS.GENDER_INPUT_OPTION_MALE]: 'male',
    [KEYS.GENDER_INPUT_OPTION_FEMALE]: 'female',
    [KEYS.AGE_INPUT_LABEL]: 'Age',

    // QIRAAH INPUT
    [KEYS.QIRAAH_INPUT_LABEL]: "Qira'ah",
    [KEYS.QIRAAH_INPUT_OPTION_HAFS]: 'Hafs',
    [KEYS.QIRAAH_INPUT_OPTION_WARSH]: 'Warsh',
    [KEYS.QIRAAH_INPUT_OPTION_NOTSURE]: 'not sure',
    [KEYS.QIRAAH_INPUT_OPTION_OTHER]: 'Other',
    [KEYS.HERITAGE_INPUT_LABEL]: 'Heritage',

    // SUBSCRIBE PAGE
    [KEYS.SUBSCRIBE_PAGE_TEMPLATE_TITLE]: 'Subscribe',
    [KEYS.SUBSCRIBE_PAGE_EMAIL_PLACEHOLDER_TEXT]: 'email address',
    [KEYS.SUBSCRIBE_PAGE_EMAIL_BUTTON_TEXT]: 'Subscribe for Updates on Tarteel',
    [KEYS.SUBSCRIBE_BUTTON_TEXT]: 'Subscribe',
    [KEYS.SUBSCRIBE_PAGE_FIRST_PARAGRAPH_1]:
      'Alhamdulillah, with your help, we have reached a total of',
    [KEYS.SUBSCRIBE_PAGE_FIRST_PARAGRAPH_2]: 'recordings.',
    [KEYS.SUBSCRIBE_PAGE_CONGRATS_MESSAGE_1]:
      'Congratulations! You have unlocked',
    [KEYS.SUBSCRIBE_PAGE_CONGRATS_MESSAGE_2]:
      '-- select any surah and ayah, and recite continuously and your recordings will be uploaded. Check it out by clicking below!',
    [KEYS.SUBSCRIBE_PAGE_HELP_US_MESSAGE_1]:
      'You can also help us reach our goal by sharing the Tarteel 50,000 challenge',
    [KEYS.SUBSCRIBE_PAGE_HELP_US_MESSAGE_2]: 'with your friends and family!',
    [KEYS.SUBSCRIBE_PAGE_RECEIVE_MESSAGE]:
      'Receive email updates about Tarteel. You can unsubscribe at any time',

    // DATASET
    [KEYS.TARTEEL_DATASET_PAGE_TITLE]: 'Download the 25k dataset | Tarteel',
    [KEYS.TARTEEL_DATASET_LINK_TEXT]: 'Tarteel datasets',
    [KEYS.DATASET_DOWNLOAD_TEXT]: 'Download the Tarteel Dataset',
    [KEYS.DATASET_DOWNLOAD_PARAGRAPH]:
      'The full dataset is available in CSV format. Audio files can be downloaded from the accompanying URLs in the CSV.',
    [KEYS.DATASET_DOWNLOAD_DETAILS]:
      '(.csv, 5.6 MB) -- approximately 25,000 recordings without evaluations.',
    [KEYS.DATASET_DOWNLOAD_SAMPLE_RECORDINGS_TEXT]:
      'Download Sample Recordings',
    [KEYS.DATASET_DOWNLOAD_SAMPLE_RECORDINGS_PARAGRAPH]:
      'Here are some sample audio files that have been submitted by Tarteel users:',

    // COOKIES MESSAGES
    [KEYS.COOKIES_BUTTON_TEXT]: 'Got it!',
    [KEYS.PRIVACY_POLICY_LINK_TEXT]: 'Privacy Policy',
    [KEYS.COOKIE_POLICY_LINK_TEXT]: 'Cookie Policy',
    [KEYS.COOKIES_NOTICE_MESSAGE_1]:
      'We use cookies to ensure you have the best browsing experience on our website.',
    [KEYS.COOKIES_NOTICE_MESSAGE_2]:
      'By using our site, you acknowledge that you have read and understood our',

    // NOT FOUND PAGE
    [KEYS.NOT_FOUND_PAGE_TEMPLATE_TITLE]: 'Not Found',
    [KEYS.NOT_FOUND_PAGE_GO_HOME_LINK]: 'Go Home',
    [KEYS.NOT_FOUND_PAGE_TEXT]: 'Page Not Found',

    // AYAH COMPONENT
    [KEYS.AYAH_NOT_FOUND_PAGE_TEXT]: 'Not A Correct Ayah Index',
    [KEYS.PICK_DIFFERENT_AYAH]: 'Pick Different Ayah',
    [KEYS.AYAH_SHOW_TRANSLITERATION]: 'Show Transliteration',
    [KEYS.AYAH_HIDE_TRANSLITERATION]: 'Hide Transliteration',
    [KEYS.AYAH_COMPONENT_LOADING_MESSAGE]:
      'Loading ayah... (if an ayah does not show up, try clicking "next ayah")',
    [KEYS.AYAHS_RECITED]: 'Ayahs recited',

    // ABOUT PAGE
    [KEYS.ABOUT_PAGE_TEMPLATE_TITLE]: 'About | Tarteel',
    [KEYS.ABOUT_PAGE_RECITED_AYAHS_MESSAGE]:
      'Over <b>{users}</b> unique users have helped us reach a total of <b>{recitedAyahs}</b> ayahs so far alhamdulillah!',
    [KEYS.ABOUT_PAGE_FIRST_PARAGRAPH_TITLE]: 'What is Tarteel?',
    [KEYS.ABOUT_PAGE_FIRST_PARAGRAPH_TEXT]:
      'Tarteel is an open-source project designed to help build digital tools to analyze the recitation of the Quran. Given the important place of reciting the Quran in the lives of Muslims, it is important to build software tools that can help ordinary Muslims recite the Quran with greater accuracy and appreciation. The name tarteel comes from the Quran itself, where God commands us to "recite the Quran with tarteel (slow, measured rhythmic tones)" (73:4).',
    [KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TITLE]:
      'What is the Tarteel 50,000 challenge?',
    [KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TEXT_1]:
      "The goal of the Tarteel 50,000 Challenge is to build the world's first public dataset of Quranic recitations carried out by ordinary Muslims. Most of the available audio of the Quran being recited is from professional reciters with strong fluency in tajweed (rules of recitation) and is recorded in studios. This is valuable when someone wants to listen to a recitation of the Quran.",
    [KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TEXT_2]:
      "However, many software tools that Muslim developers are interested in building require training machine learning models on Quranic recitation (e.g. to convert recitation2text), as it is recited by ordinary Muslims. The recitation of ordinary Muslims differs from professional recordings in many ways: for example, it may include background noise, or may be recited by people with limited knowledge of tajweed, or the demographics of reciters may be different. By collecting this data, we can train machine learning models, which we will release to software developers who are interested in developing <a href='https://docs.google.com/presentation/d/1hlcbAcEfBg2y_KWwzyPPYjh5SMxowDEWM1XkDC48ZGQ/edit?usp=sharing'>a wide variety of applications</a> that are based on recitation2text, things like:",
    [KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TEXT_2_LINK]:
      'a wide variety of applications',
    [KEYS.ABOUT_PAGE_THIRD_PARAGRAPH_TITLE]: 'Who is a part of Tarteel?',
    [KEYS.ABOUT_PAGE_THIRD_PARAGRAPH_TEXT]:
      "Tarteel came out bi'iznillah and with the efforts of the following people:",
    [KEYS.ABOUT_PAGE_FOURTH_PARAGRAPH_TITLE]: 'How can I help?',
    [KEYS.ABOUT_PAGE_FOURTH_PARAGRAPH_TEXT]:
      "Tarteel is an open-source project that is maintained by developers interested in furthering the mission of Tarteel. If you'd like to contribute, please <a href='contact.tarteel@gmail.com'>email us</a> or check out our GitHub repos: <a href='https://github.com/Tarteel-io/'>https://github.com/Tarteel-io/</a>",
    [KEYS.ABOUT_PAGE_FIFTH_PARAGRAPH_TITLE]:
      'What is the demographic breakdown of Tarteel users?',
    [KEYS.ABOUT_PAGE_SIXTH_PARAGRAPH_TITLE]:
      'Are the verses that are being recited varied?',
    [KEYS.ABOUT_PAGE_SIXTH_PARAGRAPH_TEXT]:
      "To build good machine learning models, it helps to have people recite different verses from across the entire Quran. We're measuring how well we've covered the Qur'an and these are our stats so far:",
    [KEYS.ABOUT_PAGE_SEVENTH_PARAGRAPH_TITLE]:
      "What is Tarteel's privacy policy?",
    [KEYS.ABOUT_PAGE_SEVENTH_PARAGRAPH_TEXT]:
      "The users who provide Tarteel with audio recordings of their recitations also provide a valuable trust to our team. In protect their privacy, while at the same time, creating a public dataset to be released to developers, we take the steps laid out in our <a href='/privacy'>privacy policy</a>.",
    [KEYS.ABOUT_PAGE_LAST_PARAGRAPH_TITLE]:
      'Where can I learn more about Tarteel?',
    [KEYS.ABOUT_PAGE_LAST_PARAGRAPH_TEXT]:
      "For more information, please check out our <a href='https://api.tarteel.io/static/docs/white-paper.pdf' target='_blank'>white paper</a>.",
    [KEYS.FIELDS_OF_USE_FIRST_ITEM]:
      'Hifz helping tools that automatically correct mistakes',
    [KEYS.FIELDS_OF_USE_SECOND_ITEM]:
      'Tajweed teaching tools in a similar vein',
    [KEYS.FIELDS_OF_USE_THIRD_ITEM]:
      'Masjid kiosks that follow the imam and display the translation of the verse',

    // MOBILE PAGE
    [KEYS.MOBILE_PAGE_TITLE]: 'Mobile App | Tarteel',
    [KEYS.MOBILE_KEYWORD]: 'Download our mobile app',
    [KEYS.MOBILE_PAGE_PARAGRAPH]:
      'Use Tarteel on the go to make your breaks and commutes more productive and full of reward with our Android and iOS apps.',

    // GENERAL INPUTS
    [KEYS.NAME_INPUT_PLACEHOLDER]: 'e.g. Mohamed',
    [KEYS.EMAIL_ADDRESS_INPUT_PLACEHOLDER]: 'e.g. Mohamed@example.com',
    [KEYS.MESSAGE_TEXTAREA_PLACEHOLDER]: 'Your message here...',
    [KEYS.NAME_INPUT_LABEL]: 'Name',
    [KEYS.USERNAME_INPUT_LABEL]: 'Username',
    [KEYS.PHONE_NUMBER_INPUT_LABEL]: 'Phone Number',
    [KEYS.EMAIL_ADDRESS_INPUT_LABEL]: 'Email Address',
    [KEYS.MESSAGE_TEXTAREA_LABEL]: 'Message',

    // LANDING
    [KEYS.LANDING_GREETING_MESSAGE]: 'Salaam!',
    [KEYS.LANDING_FIRST_PARAGRAPH]:
      " Welcome to the <b>Tarteel 50,000 Challenge</b>! Thank you for helping us build the world's first public, open-source dataset</a> of Quran recitations by ordinary Muslim men and women. <a href='/about'>Learn more</a>",
    [KEYS.LANDING_SECOND_PARAGRAPH_TITLE]: 'How it works',
    [KEYS.LANDING_LIST_FIRST_ITEM]:
      'To start off, Tarteel will provide you with <b>5 verses</b> to recite.',
    [KEYS.LANDING_LIST_SECOND_ITEM]:
      "Click the mic to record yourself reciting the verse. <b>Don't worry</b> about making your recitation perfect, as we're looking for people with a variety of recitation levels.",
    [KEYS.LANDING_LIST_THIRD_ITEM]:
      "These recitations <a href='/privacy'>will be released</a> as an open-source initiative to encourage machine learning applications based on recitations of the Quran.",
    [KEYS.LANDING_LAST_LINE]:
      'Click <strong>START</strong> below to get started!',
    [KEYS.LANDING_BUTTON_TEXT]: 'Start',

    // CONTACT US
    [KEYS.CONTACT_US_PAGE_TITLE]: 'Contact us | Tarteel',
    [KEYS.CONTACT_US]: 'Contact Us',
    [KEYS.CONTACT_US_SEND]: 'Send',
    [KEYS.CONTACT_US_BUTTON_TEXT]: 'contact us',
    [KEYS.CONTACT_US_SUBJECT]: 'Subject',

    // LOGIN FORM
    [KEYS.LOGIN_BUTTON]: 'Login',
    [KEYS.LOGIN_DONT_HAVE_ACCOUNT]: "Don't have an account? Register",
    [KEYS.LOGIN_FORGET_PASSWORD]: 'Forgot password ?',
    [KEYS.LOGIN_EMAIL_USERNAME_LABEL]: 'Email/Username',
    [KEYS.LOGIN_PASSWORD_LABEL]: 'Password',
    [KEYS.LOGIN_PASSWORD_PLACEHOLDER]: 'Type your Password',

    // SIGNUP FORM
    [KEYS.SIGNUP_REGISTER_BUTTON]: 'Register',
    [KEYS.SIGNUP_REGISTER_MESSAGE]: 'Already have an account? Login',

    // NEW PASSWORD FORM
    [KEYS.NEW_PASSSWORD_VERIFY_LOGIN_MESSAGE]:
      'Your New Password has been set, you can start using it to log in now.',
    [KEYS.NEW_PASSSWORD_VERIFY_LOGIN_BUTTON]: 'Login Now?',

    // VERIFY PASSWORD FORM
    [KEYS.VERIFY_PASSWORD_TITLE]: 'Reset Your Password',
    [KEYS.VERIFY_PASSWORD_MESSAGE]:
      "We've sent you a verification code to your email:",
    [KEYS.VERIFY_PASSWORD_BUTTON]: 'Change Password',
    [KEYS.VERIFY_PASSWORD_VERIFICATION_CODE_LABEL]: 'Verification Code',
    [KEYS.VERIFY_PASSWORD_NEW_PASSWORD_LABEL]: 'New Password',

    // RECORDING ERROR
    [KEYS.RECORDING_ERROR_MESSAGE_1]:
      "It doesn't look like you have microphone permissions enabled. Get a better experience on our mobile app or try a different browser!",
    [KEYS.RECORDING_ERROR_MESSAGE_2]:
      'To upload recordings, please enable microphone access, or use a different browser.',

    // FOOTER
    [KEYS.FOOTER_EVALUATOR_LINK]: 'Want to help us evaluating some ayahs?',
    [KEYS.FOOTER_MESSAGE_1]: 'Thanks for helping us in reciting ayahs.',
    [KEYS.FOOTER_MESSAGE_2]:
      'You can also help us evaluating some ayahs other people has recited.',
    [KEYS.FOOTER_MESSAGE_3]:
      'With the help of users like you, we have evaluated',

    // RESET PASSWORD
    [KEYS.RESET_YOUR_PASSWORD_TITLE]: 'Reset Your Password',
    [KEYS.RESET_YOUR_PASSWORD_BUTTON]: 'Reset',

    // AYAH RECOGNITION PAGE
    [KEYS.AYAH_RECOGNITION]: 'Ayah Recognition',
    [KEYS.AYAH_RECOGNITION_POWERED_BY]:
      "Powered by <a href={url} target='_blank'>Iqra</a>",
    [KEYS.AYAH_RECOGNITION_RECOGNITION_MESSAGE]:
      'Tap on the mic below and start recording to find the ayah with the closest match.',
    [KEYS.AYAH_RECOGNITION_IMPROVE_ACCURACY]:
      'Want to see recitation correction?',
    [KEYS.AYAH_RECOGNITION_CONTRIBUTE]: 'Contribute your recording',
    [KEYS.AYAH_RECOGNITION_MIC_PERMISSION_ERROR]:
      "Permission to use microphone is blocked. To fix, please \n <a target='_blank' href={chromeLink}> change your settings here</a>.",
    [KEYS.AYAH_RECOGNITION_AUDIO_CAPTURE_ERROR]:
      "No microphone was found. Ensure that a microphone is installed and that your \n <a target='_blank' href={errorLink}> microphone settings </a> \n are configured correctly.",
    [KEYS.AYAH_RECOGNITION_NO_SPEECH_ERROR]:
      "No speech was detected. You may need to adjust your <a target='_blank' href={errorLink}> microphone settings</a>.",
    [KEYS.AYAH_RECOGNITION_RESULTS]: 'Results',
    [KEYS.AYAH_RECOGNITION_NEW_SEARCH]: 'New Search',

    // PROFILE PAGE
    [KEYS.PROFILE_TITLE]: 'My Profile | Tarteel',
    [KEYS.PROFILE_THANKS_USER_FOR_CONTRIBUTING_MESSAGE]:
      'Thank you for your work in contributing to Tarteel.',
    [KEYS.PROFILE_TOTAL_OF_VERSES_HAS_BEEN_RECITED]:
      'You have recited a total of <strong>{userRecitedAyahs}</strong> verses.',
    [KEYS.PROFILE_SEE_STATISTICS_MESSAGE]:
      'This information is based only on sessions recorded using this particular device and browser, and may not show up if you clear your cache or use a different browser. If you\'d like to see these statistics on a different device or <a href = {`https://facebook.com/sharer/sharer.php?u=https://www.tarteel.io/profile/${sessionId}`} target="_blank" aria- label=""> share </a> these statistics, please use the following permalink:',
    [KEYS.PROFILE_WEEKLY_ACTIVITY]: 'Your Weekly Activity',
    [KEYS.PROFILE_VERSES_RECITED_LAST_WEEK]: 'Verses Recited Last Week',
    [KEYS.PROFILE_VERSES_RECITED_PARAGRAPH_MESSAGE]:
      'These are the verses you recited over the past week. Click on a verse to listen to its recording.',
    [KEYS.PROFILE_OLDER_RECITATIONS]: 'Older Recitations',
    [KEYS.PROFILE_OLDER_RECITATIONS_PARAGRAPH_MESSAGE]:
      'These are the verses more than a week ago. Click on a verse to listen to its recording.',
    [KEYS.PROFILE_NOTE_MESSAGE]: 'Not visible on your public profile',
    [KEYS.PROFILE_SHARE_MESSAGE]: 'Share your profile',

    // EVALUATOR PAGE
    [KEYS.EVALUATOR_TITLE_TEXT]: 'Listen and Evaluate',
    [KEYS.EVALUATOR_PARAGRAPH_1]:
      'Is the correct verse being recited in this recording?',
    [KEYS.EVALUATOR_PARAGRAPH_2]:
      "(Don't worry about minor mistakes, <em>tajweed</em>, background noise, or even an omitted word.)",
    [KEYS.EVALUATOR_PARAGRAPH_2_LINK_TEXT]: 'See more help',
    [KEYS.EVALUATOR_CLICK_TO_HEAR_TEXT]: 'to hear the sentence.',
    [KEYS.EVALUATOR_THANKS_FOR_HELPING_MESSAGE_1]:
      'Thanks for helping us evaluating the recited ayahs.',
    [KEYS.EVALUATOR_THANKS_FOR_HELPING_MESSAGE_2]:
      'With the help of users like you, we have evaluated',
    [KEYS.EVALUATOR_THANKS_FOR_HELPING_MESSAGE_3]:
      'Want to help us evaluating more ayahs?',

    // PRIVACY POLICY PAGE
    [KEYS.PRIVACY_POLICY_PAGE_TITLE]: 'Tarteel Privacy Policy | Tarteel',
    [KEYS.PRIVACY_POLICY_PAGE_PARAGRAPH]:
      'Tarteel is committed to maintaining robust privacy protections for its users.  Our Privacy Policy is designed to help you understand how we collect, use and safeguard the information you provide to us and to assist you in making informed decisions when using our service. By accessing our Site or our Service, you accept our Privacy Policy, and you consent to our collection, storage, use and disclosure of your Personal Information and Data as described in this Privacy Policy. <br /><br />I. Information We Collect <br /> We collect “Non- Personal Information” and “Personal Information.” Non- Personal Information includes information that cannot be used to personally identify you, such as anonymous usage data, general demographic information we may collect, referring/exit pages and URLs, platform types, preferences you submit and preferences that are generated based on the data you submit and number of clicks. Personal Information includes the voice recordings which you submit to us through the recitation process, demographic information that you provide, IP addresses, as well as your email when you elect to join the mailing list. <br /> <br />1.Information collected via Technology <br /> In an effort to improve the quality of the Service, we track information provided to us by your browser or by our software application when you view or use the Service, such as the website you came from(known as the “referring URL”), the type of browser you use, the device from which you connected to the Service, the time and date of access, and other information that does not personally identify you.We track this information using cookies, or small text files which include an anonymous unique identifier.Cookies are sent to a user’s browser from our servers and are stored on the user’s computer hard drive.Sending a cookie to a user’s browser enables us to collect Non - Personal information about that user and keep a record of the user’s preferences when utilizing our services, both on an individual and aggregate basis. <br /> <br />2.   Information you provide to us <br /> In addition to the information provided automatically by your browser when you visit the Site, users of this site voluntary submit information through this site.We collect this information, including the voice recordings which you submit to us through the recitation process, demographic information that you provide, as well as your email when you elect to join the mailing list. <br /> <br />3. Children’s Privacy <br /> The Site and the Service are not directed to anyone under the age of 13. The Site does not knowingly collect or solicit information from anyone under the age of 13. In the event that we learn that we have gathered personal information from anyone under the age of 13 without the consent of a parent or guardian, we will delete that information as soon as possible.If you believe we have collected such information, please contact us. <br /><br />II. HOW WE USE AND SHARE INFORMATION <br /> Personal Information: <br />Except as otherwise stated in this Privacy Policy, we do not sell, trade, rent or otherwise share for marketing purposes your Personal Information with third parties without your consent. We do share Personal Information with vendors who are performing services for the Company, such as the servers for our email communications who are provided access to user’s email address for purposes of sending emails from us. Those vendors use your Personal Information only at our direction and in accordance with our Privacy Policy. However, note that the dataset that we are making is open-source: this means that the audio files of the recitations will be released publicly along with the demographic information that you have provided. This is to provide software developers the ability to develop tools based on the data. Please consider this thoroughly before using the service on the Site. <br /> In general, the Personal Information you provide to us is used to help us communicate with you.For example, we use Personal Information to contact users in response to questions, solicit feedback from users, provide technical support, and inform users about promotional offers. <br /> We may share Personal Information with outside parties if we have a good - faith belief that access, use, preservation or disclosure of the information is reasonably necessary to meet any applicable legal process or enforceable governmental request; to enforce applicable Terms of Service, including investigation of potential violations; address fraud, security or technical concerns; or to protect against harm to the rights, property, or safety of our users or the public as required or permitted by law. <br /><br />Non-Personal Information <br /> In general, we use Non - Personal Information to help us improve the Service and customize the user experience.We also aggregate Non - Personal Information in order to track trends and analyze use patterns on the Site.This Privacy Policy does not limit in any way our use or disclosure of Non - Personal Information and we reserve the right to use and disclose such Non - Personal Information to our partners, advertisers and other third parties at our discretion. <br /> In the event we undergo a business transaction such as a merger, acquisition by another company, or sale of all or a portion of our assets, your Personal Information may be among the assets transferred.You acknowledge and consent that such transfers may occur and are permitted by this Privacy Policy, and that any acquirer of our assets may continue to process your Personal Information as set forth in this Privacy Policy.If our information practices change at any time in the future, we will post the policy changes to the Site so that you may opt out of the new information practices.We suggest that you check the Site periodically if you are concerned about how your information is used. <br /><br />III. HOW WE PROTECT INFORMATION <br /> We implement security measures designed to protect your information from unauthorized access.Your account is protected by your account password and we urge you to take steps to keep your personal information safe by not disclosing your password and by logging out of your account after each use.We further protect your information from potential security breaches by implementing certain technological security measures including encryption, firewalls and secure socket layer technology.However, these measures do not guarantee that your information will not be accessed, disclosed, altered or destroyed by breach of such firewalls and secure server software.By using our Service, you acknowledge that you understand and agree to assume these risks. <br/><br/>IV. YOUR RIGHTS REGARDING THE USE OF YOUR PERSONAL INFORMATION <br/> You have the right at any time to prevent us from contacting you for marketing purposes.When we send a promotional communication to a user, the user can opt out of further promotional communications by following the unsubscribe instructions provided in each promotional e - mail.You can also indicate that you do not wish to receive marketing communications from us in the[list location of opt - out page, i.e.“Settings” section]of the Site.Please note that notwithstanding the promotional preferences you indicate by either unsubscribing or opting out in the[location of opt - out page]of the Site, we may continue to send you administrative emails including, for example, periodic updates to our Privacy Policy. < br /><br />V. LINKS TO OTHER WEBSITES <br/> As part of the Service, we may provide links to or compatibility with other websites or applications.However, we are not responsible for the privacy practices employed by those websites or the information or content they contain.This Privacy Policy applies solely to information collected by us through the Site and the Service.Therefore, this Privacy Policy does not apply to your use of a third party website accessed by selecting a link on our Site or via our Service.To the extent that you access or use the Service through or on another website or application, then the privacy policy of that other website or application will apply to your access or use of that site or application.We encourage our users to read the privacy statements of other websites before proceeding to use them. <br/><br/>VI. CHANGES TO OUR PRIVACY POLICY <br/> The Company reserves the right to change this policy and our Terms of Service at any time.We will notify you of significant changes to our Privacy Policy by sending a notice to the primary email address specified in your account or by placing a prominent notice on our site.Significant changes will go into effect 30 days following such notification.Non - material changes or clarifications will take effect immediately.You should periodically check the Site and this privacy page for updates.',

    // CONTRIBUTE PAGE
    [KEYS.CONTRIBUTE_PAGE_TITLE]: 'Contribute your recording | Tarteel',

    // PARTNERS PAGE
    [KEYS.PARTNERS_PAGE_TITLE]: 'Partners | Tarteel',
    [KEYS.PARTNERS_PARAGRAPH]:
      "We have proudly partnered with these orgs to further mission of Tarteel. If you're interested in partenering with us, <a href='/contact'>get in touch</a>!",

    // DONATE PAGE
    [KEYS.DONATE_PAGE_TITLE]: 'Donate | Tarteel',

    // CONTRIBUTORS
    [KEYS.CONTRIBUTOR_1]: 'Abubakar Abid, PhD student at Stanford University',
    [KEYS.CONTRIBUTOR_2]: 'Ali Abid, software engineer at Google',
    [KEYS.CONTRIBUTOR_3]: 'Ali Abdalla, mechanical engineer at Tesla',
    [KEYS.CONTRIBUTOR_4]:
      'Abdellatif Abdelfattah, software engineer at Twitter',
    [KEYS.CONTRIBUTOR_5]: 'BaHaa Jr., software engineering student at HTI',
    [KEYS.CONTRIBUTOR_6]: 'Hamzah Khan, software engineer at Uber ATG',
    [KEYS.CONTRIBUTOR_7]:
      'Areeba Abid, biomedical engineering student at Georgia Tech',
    [KEYS.CONTRIBUTOR_8]:
      'Anas Abou Allaban, roboticist and undergraduate at Northeastern University',
    [KEYS.CONTRIBUTOR_9]: 'Abdulrahman Alfozan, software engineer at Facebook',
    [KEYS.CONTRIBUTOR_10]:
      'Mohammad Siddiqui, 4th Year undergraduate student at UCLA.',
    [KEYS.CONTRIBUTOR_11]: 'Ali Emara, iOS Software Engineer at Adobe',
    [KEYS.CONTRIBUTOR_12]: 'Haider Ahmad, recent Duke University grad',
    [KEYS.CONTRIBUTOR_13]:
      'Marwa Abdulhai, computer science undergraduate at MIT',
    [KEYS.CONTRIBUTOR_14]:
      'Moin Nadeem, junior at MIT studying computer science',
    [KEYS.CONTRIBUTOR_15]: 'Moumen Soliman, Front End Software Engineer',
  },
};

export default EN;
