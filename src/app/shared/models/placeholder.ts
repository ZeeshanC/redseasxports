export const ENGLISH = {
    'amount': {
      'placeholder': 'How much do you want to raise?',
      'error': {
        'min': 'The minimum goal amount is &#x20b9; 2000!',
        'max': 'The maximum goal amount can be &#x20b9; 5 Crores',
        'required': 'The minimum goal amount is ₹ 2000!'
      },
      'hint': 'Should be minimum &#x20b9; 2000',
      'popover': {
        'title': 'Goal',
        // tslint:disable-next-line:max-line-length
        'desc': `You can always change your goal amount later. If you're not sure where to start, most campaigns have a goal of ₹ 1,00,000.`,
        'eg': 'Goal should be larger than ₹ 2,000.'
      }
    },
    'title': {
      'placeholder': 'Fundraiser Title',
      'error': {
        'minlength': 'Fundraiser title should be between 5-75 characters',
        'maxlength': 'Fundraiser title should be between 5-75 characters',
        'required': 'Fundraiser title should be between 5-75 characters'
      },
      'popover': {
        'title': 'This is your Fundraiser title.',
        'desc': 'E.g. Help me empower underprivileged girl children or Help our Aastha fight Cancer!'
      },
      'medicalDocTitle': 'Add Medical Documents'
    },
    'relation': {
      'placeholder': 'Whom are you raising funds for?',
      'popover': {
        'title': 'Who are you raising funds for',
        'desc': 'E.g. You can create campaign for Personal, Creative or NGO'
      },
      'error': {
        'required': 'Please select a valid option'
      }
    },
    'name': {
      'placeholder': `Patient's full name`,
      'error': {
        'maxlength': 'Name should not exceed 50 characters',
        'pattern': 'Please enter a valid name',
        'required': 'Please enter a valid name'
      },
      'hint': 'Name as mentioned in Patient’s Aadhar card',
      'popover': {
        'title': `Patient's name`,
        'desc': 'Please write the name of the patient as displayed on his/her Aadhar card'
      }
    },
    'patient': {
      'placeholder': `Patient's full name`,
      'error': {
        'maxlength': 'Name should not exceed 50 characters',
        'minlength': 'Please enter Patient full name as mentioned in their Aadhar card',
        'pattern': 'Please enter a valid name',
        'required': 'Please enter a valid name'
      },
      'hint': 'Name as mentioned in Patient’s Aadhar card',
      'popover': {
        'title': `Patient's name`,
        'desc': 'Please write the name of the patient as displayed on his/her Aadhar card'
      }
    },
    'age': {
      'placeholder': `Patient's age`,
      'error': {
        'required': 'Please enter a valid age group'
      }
    },
    'hosptialisationStatus': {
      'placeholder': `Hospitalisation status`,
      'error': {
        'required': 'Please select the hospitalisation status'
      }
    },
    'cause': {
      'placeholder': 'Please choose a cause',
      'popover': {
        'title': 'This is your cause',
        'desc': 'This is to help like-minded, kind people find your fundraiser on our website.'
      },
      'error': {
        'required': 'Please choose a cause'
      }
    },
    'end_date': {
      'placeholder': 'End Date',
      'error': {
        'minlength': 'Fundraiser end date cannot be older than today!',
      },
      'popover': {
        'title': 'Fundraiser End Date',
        'desc': 'Your Fundraiser will end on this date.'
      }
    },
    'fundraiser_image': {
      'placeholder': 'Add fundraiser image / video',
      'optional': '(Optional)',
      'upload': 'Upload',
      'popover': {
        'title': 'Upload a Fundraiser Image/Video',
        'desc': `This is going to be the face of your fundraiser.
                   Great photos will help your fundraiser raise more money.
                   Add non-pixelated, high resolution, clear images/videos that best describe your fundraiser.`,
        'eg': `Ideal Size: 750x435. If it’s bigger, don’t worry, you can crop it while uploading.`
      }
    },
    'beneficiary_image': {
      'placeholder': `Add Patient's Image`,
      'popover': {
        'title': 'This is the person whom you are raising money for.',
        'desc': `Adding an image increase donations by 50%.
                   We may request additional information from you to verify that the funds raised will go to this beneficiary.`
      }
    },
    'short_description': {
      'placeholder': 'Add a Short Description',
      'error': {
        'minlength': 'Minimum 10 characters required',
        'maxlength': 'Short Description should not exeeds 120 characters'
      },
      'popover': {
        'title': 'Explain your fundraiser in short',
        'desc': `Write a short blurb for your fundraiser in 120 characters.`,
        'eg': `E.g. Aastha is only 8 years old, support her fight against Acute Lymphoblastic Leukemia`
      }
    },
    'description_story': {
      'placeholder':
        'Write a story that does justice to your cause and makes the supporter click the donate button.'
        + '\n\nFollow these steps:'
        + '\n* Talk about who you are raising funds for, be it yourself or your loved one.'
        + '\n* Explain why you are raising funds.'
        + '\n* Make an appeal to your supporters.',
      'popover': {
        'title': 'Tell us more about your Fundraiser',
        'desc': 'Tell Your Story',
        'placeholder':
          `<div>• Write a story that does justice to your cause and makes the supporter click the donate button.</div>
              <div>• Don’t get overwhelmed if you feel stuck.</div>
              <div>• Follow these steps:</div>
              <div>• Talk about who you're raising funds for, be it yourself or your loved one.</div>
              <div>• Explain why you're raising funds.</div>
              <div>• Make an appeal to your supporters.</div>
              <div>• Let your supporters know what made you start a fundraiser for this cause so they feel motivated to make a contribution.</div>
              <div>• Provide all details so your supporters know where their money is going.</div>
              <div>• Avoid pasting information directly from a Word document.</div>`,
      }
    },
    'disease': {
      'label': 'Ailment / Medical Condition',
      'placeholder': 'Type your Medical Condition here',
      'error': {
        'required': 'Please select a disease'
      }
    },
    'hospital': {
      'label': 'Hospital',
      'placeholder': 'Type your Hospital Name here',
      'error': {
        'required': 'Please select a hospital'
      }
    },
    'cover_image': {
      'title': 'Upload Cover Image',
      'desc': ` This is going to be the face of your fundraiser.
                  Great photos will help your fundraiser raise more money.
                  Add non-pixelated, high resolution, clear images/videos that best describe your fundraiser.
                  Ideal Size: 750x435. If it’s bigger, don’t worry, you can crop it while uploading.`,
      'see_egs': 'See Examples'
    },
    'medicalPopoverContent': {
      'title': 'Following info on the document(s) MUST be clearly readable:',
      'desc': `
          <ol>
              <li>Overall treatment cost, Patient name, Hospital name, Doctor name, Medical condition, Date of letter</li>
              <li>The above information on the document(s) should match with the information shared in the fundraiser</li>
              <li>The overall treatment cost on the document(s) should match the goal amount entered in the fundraiser</li>
              <li>The document(s) should not be older than 6 months from the date of upload</li>
              <li>In case the document is handwritten, it must have the doctor/hospital’s stamp</li>
          </ol>`,
      'see_egs': '',
      'hint_medical_file': '*Kindly ensure your uploaded documents contain the treatment cost in line with the fundraiser goal amount for easy approval. Check all documents prior to submission'
    },
    'sample_images': {
      'title': 'Try these examples',
      'got_it': 'Got it'
    },
    'guardian_relations': {
      'Friend': {
        'Below 5 years': 'Gaurdian no. required',
        '6 -10 years': 'Gaurdian no. required',
        '11 - 17 years': 'Gaurdian no. required',
        '18 - 30 years': 'Patient\'s no. required',
        '30 - 40 years': 'Patient\'s no. required',
        'Above 40 years': 'Patient\'s no. required'
      },
      'Friend\'s Family': {
        'Below 5 years': 'Gaurdian no. required',
        '6 -10 years': 'Gaurdian no. required',
        '11 - 17 years': 'Gaurdian no. required',
        '18 - 30 years': 'Patient\'s no. required',
        '30 - 40 years': 'Patient\'s no. required',
        'Above 40 years': 'Patient\'s no. required'
      },
      'Colleague': {
        'Below 5 years': 'Gaurdian no. required',
        '6 -10 years': 'Gaurdian no. required',
        '11 - 17 years': 'Gaurdian no. required',
        '18 - 30 years': 'Patient\'s no. required',
        '30 - 40 years': 'Patient\'s no. required',
        'Above 40 years': 'Patient\'s no. required'
      },
      'Relative': {
        'Below 5 years': 'Gaurdian no. required',
        '6 -10 years': 'Gaurdian no. required',
        '11 - 17 years': 'Gaurdian no. required',
        '18 - 30 years': 'Patient\'s no. required',
        '30 - 40 years': 'Patient\'s no. required',
        'Above 40 years': 'Patient\'s no. required'
      },
      'Legal ward': {
        '18 - 30 years': 'Patient\'s no. required',
        '30 - 40 years': 'Patient\'s no. required',
        'Above 40 years': 'Patient\'s no. required'
      }
    },
    'survey': {
      'placeholder': 'How did you first hear about Ketto?',
      'error': {
        'required': 'Field required'
      }
    },
    change_easily: 'You can easily make changes to your fundraiser at any time',
    tell_us_more: 'Tell us more about your Fundraiser',
    patientIsMy: 'The Patient is my...',
    qualification: 'Your Education Qualification',
    occupation: 'Your Employment Status',
    raising_funds_for: 'Raising funds for',
    ngo_charity: 'NGO/Charity',
    other: 'Other',
    purposeText: 'purpose',
    medicalTreatment: 'Medical Treatment',
    iAgree: 'I agree to Ketto\'s',
    serviceAgreement: 'service agreement',
    and: 'and',
    change_purpose: 'Change purpose',
    save_and_continue: 'Save and continue',
    ketto_zero_fee: 'Ketto’s zero platform fee policy will ensure more funds for you.',
    is_patient_admitted: 'Is the patient admitted to the Hospital?',
    tell_us_about_patient: `Tell us about the patient`,
    medical_condition: `Ailment/Medical Condition`,
    guardian_no: `Guardian Mobile number`,
    patient_no: 'Patient Mobile number',
    yes: `Yes`,
    no: `No`,
    story_form_title: `Tell the story about why you are running a Fundraiser`,
    help_me_write_this: `Help Me write this`,
    terms_of_use: `Terms of Use`,
    privacy_policy: `Privacy Policy`,
    plans_and_pricing: `Plans & Pricing`,
    submit: 'Submit',
    get_assistance: 'Get Assistance',
    selectOption: 'Please select an option from the list',
    validPhNo: 'Please enter a valid number',
    back: 'Back',
    fieldRequired: 'Field Required',
    medicalDocTitle: 'Add Medical Documents',
    acknowledge: 'I acknowledge and confirm that the information provided above is true and correct to the best of my knowledge and belief and I agree to be liable if any of the above information is found to be false or misleading. I hereby give my consent for sharing it with regulatory authorities or disclosing it as may be required by law."',
    city: {
      placeholder: 'Enter Your City',
      popover: {
        title: 'Enter your fundraiser city',
        desc: 'This is the city in which this fundraiser will run.'
      }
    },
    'uploadImg': {
      'error': {
        'required': 'Field required',
        'pattern': 'Please enter a valid number'
      }
    },
    skipStepInfo: 'Don’t worry! You can skip this step for now and add the story details and medical documents after submiting.'
  };
  